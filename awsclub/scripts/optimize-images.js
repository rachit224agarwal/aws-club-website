import fs from 'fs-extra';
import path from 'path';
import glob from 'fast-glob';
import { execSync } from 'child_process';
import { IMAGES_DIR, WEBP_DIR, MANIFEST_FILE, PROJECT_ROOT, CONFIG } from './modules/constants.js';
import { logger } from './modules/logger.js';
import { loadCache, getCacheEntry, setCacheEntry, saveCache, isCacheEntryValid } from './modules/image-cache.js';
import { getFileHash, getWebpPath, getFileSize, cleanAllTempFiles, atomicWriteJson, withRetry } from './modules/image-utils.js';
import { getResizeOptions } from './modules/resize-images.js';
import { convertToWebp } from './modules/convert-images.js';
import { replaceImports, rollbackImports } from './modules/replace-imports.js';
import { verifyImages, runBuild } from './modules/verify-images.js';
import { validateImage } from './modules/image-validator.js';
import { cleanupOrphanedImages } from './modules/cleanup-images.js';
import { ProgressBar } from './modules/progress.js';
import { processConcurrently } from './modules/parallel-pool.js';
import { generateReports } from './modules/report-generator.js';

// Parse CLI Flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isCI = args.includes('--ci');
const isStaged = args.includes('--staged');

let customConcurrency = CONFIG.concurrency;
const concArg = args.find(a => a.startsWith('--concurrency='));
if (concArg) {
  const parsedConc = parseInt(concArg.split('=')[1], 10);
  if (!isNaN(parsedConc) && parsedConc > 0) customConcurrency = parsedConc;
}

logger.setCI(isCI);
logger.setDryRun(isDryRun);

// Graceful process termination listener
let isShuttingDown = false;
function registerGracefulShutdown() {
  const handleSignal = async (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    logger.warn(`\nProcess interrupted (${signal}). Executing graceful shutdown and cleaning temporary lock files...`);
    await cleanAllTempFiles();
    process.exit(1);
  };
  process.on('SIGINT', () => handleSignal('SIGINT'));
  process.on('SIGTERM', () => handleSignal('SIGTERM'));
}
registerGracefulShutdown();

async function processSingleImage(filePath, dryRun = false) {
  const isValid = await validateImage(filePath);
  if (!isValid) return null;

  const originalSize = await getFileSize(filePath);
  const hash = await getFileHash(filePath);
  const outputPath = getWebpPath(filePath, IMAGES_DIR, WEBP_DIR);
  const resizeOptions = await getResizeOptions(filePath);

  const cacheValid = await isCacheEntryValid(filePath, hash, resizeOptions, outputPath);

  if (cacheValid) {
    const entry = getCacheEntry(filePath);
    const optSize = entry.status === 'uncompressed_larger' ? originalSize : (entry.optimizedSize || await getFileSize(outputPath));
    return {
      inputPath: filePath,
      outputPath,
      status: entry.status === 'uncompressed_larger' ? 'uncompressed_larger' : 'skipped',
      originalSize,
      optimizedSize: optSize,
      width: entry.width || 0,
      height: entry.height || 0
    };
  }

  const convertedInfo = await convertToWebp(filePath, outputPath, resizeOptions, dryRun);

  if (!dryRun) {
    setCacheEntry(filePath, {
      hash,
      outputPath,
      status: convertedInfo.status,
      width: convertedInfo.width,
      height: convertedInfo.height,
      resizeProfile: resizeOptions,
      conversionSettings: CONFIG.webp,
      scriptVersion: CONFIG.version,
      timestamp: Date.now(),
      originalSize,
      optimizedSize: convertedInfo.size
    });
  }

  return {
    inputPath: filePath,
    outputPath,
    status: convertedInfo.status,
    originalSize,
    optimizedSize: convertedInfo.size,
    width: convertedInfo.width,
    height: convertedInfo.height
  };
}

async function runPipeline() {
  const startTime = Date.now();
  const modeLabel = isStaged ? 'STAGED PRE-COMMIT MODE' : 'FULL WORKSPACE MODE';
  
  if (isDryRun) {
    logger.header(`Starting Image Optimization Pipeline (${modeLabel} - DRY RUN)`);
  } else {
    logger.header(`Starting Concurrent Image Optimization (${modeLabel} | ${customConcurrency} Workers)`);
  }

  await loadCache();
  if (!isDryRun) await fs.ensureDir(WEBP_DIR);

  let files = [];
  if (isStaged) {
    try {
      const gitOut = execSync('git diff --cached --name-only --diff-filter=ACM', { cwd: PROJECT_ROOT, encoding: 'utf8' });
      const stagedFiles = gitOut.split('\n').map(s => s.trim()).filter(Boolean);
      files = stagedFiles
        .filter(f => f.startsWith('src/assets/images/') && /\.(png|jpg|jpeg)$/i.test(f))
        .map(f => path.join(PROJECT_ROOT, f));
    } catch {
      logger.warn('Git query failed; defaulting to full scan.');
      const formatsPattern = `**/*.{${CONFIG.formats.map(e => e.replace('.', '')).join(',')}}`;
      files = await glob([formatsPattern], { cwd: IMAGES_DIR, absolute: true });
    }

    if (files.length === 0) {
      logger.success('✔ Zero staged PNG/JPG/JPEG image assets detected. Pre-commit check completed in 0ms.');
      return;
    }
  } else {
    const formatsPattern = `**/*.{${CONFIG.formats.map(e => e.replace('.', '')).join(',')}}`;
    files = await glob([formatsPattern], { cwd: IMAGES_DIR, absolute: true });
  }

  const progressBar = new ProgressBar({ total: files.length, ci: isCI, dryRun: isDryRun });
  logger.setProgressBar(progressBar);
  progressBar.start();

  const { results, failures } = await processConcurrently(
    files,
    customConcurrency,
    async (file) => await processSingleImage(file, isDryRun),
    (item, current) => progressBar.update(current, item)
  );

  progressBar.stop();
  logger.setProgressBar(null);

  const validResults = results.filter(Boolean);
  
  // In staged mode, skip scanning full directory for orphans unless running a full build
  const deletedFiles = isStaged ? [] : await cleanupOrphanedImages(isDryRun);
  await saveCache(isDryRun);

  // Update ONLY affected manifest entries instead of wiping and rebuilding the entire file
  let manifest = {};
  if (await fs.pathExists(MANIFEST_FILE)) {
    try {
      manifest = await withRetry(() => fs.readJson(MANIFEST_FILE));
    } catch {
      manifest = {};
    }
  }

  let manifestModified = false;
  for (const item of validResults) {
    if (!item) continue;
    const relInput = path.relative(IMAGES_DIR, item.inputPath).replace(/\\/g, '/');
    if (item.status === 'converted' || (item.status === 'skipped' && item.outputPath)) {
      const relOutput = path.relative(WEBP_DIR, item.outputPath).replace(/\\/g, '/');
      if (manifest[relInput] !== relOutput) {
        manifest[relInput] = relOutput;
        manifestModified = true;
      }
    } else if (item.status === 'uncompressed_larger') {
      if (manifest[relInput]) {
        delete manifest[relInput];
        manifestModified = true;
      }
    }
  }

  for (const del of deletedFiles) {
    for (const [key, val] of Object.entries(manifest)) {
      if (val === del) {
        delete manifest[key];
        manifestModified = true;
      }
    }
  }

  if (manifestModified && !isDryRun) {
    await atomicWriteJson(MANIFEST_FILE, manifest, { spaces: 2 });
  }

  logger.info('Refactoring codebase image imports via AST parser...');
  const importUpdates = await replaceImports({ dryRun: isDryRun, onlyStaged: isStaged, manifestModified });

  try {
    if (!isStaged) {
      await verifyImages(isDryRun);
      await runBuild(isDryRun);
    }
  } catch {
    logger.error('Pipeline verification or production build check failed! Initiating automated rollback...');
    await rollbackImports();
    await generateReports({
      startTime,
      results: validResults,
      failures,
      deletedFiles,
      updatedImports: importUpdates,
      dryRun: isDryRun,
      ci: isCI,
      staged: isStaged,
      status: 'failed'
    });
    await cleanAllTempFiles();
    process.exit(1);
  }

  await generateReports({
    startTime,
    results: validResults,
    failures,
    deletedFiles,
    updatedImports: importUpdates,
    dryRun: isDryRun,
    ci: isCI,
    staged: isStaged,
    status: 'success'
  });

  // If running in pre-commit staged mode, automatically stage any updated artifacts or conversions
  if (isStaged && !isDryRun) {
    try {
      const toAdd = ['src/assets/webp', MANIFEST_FILE, '.image-cache.json', 'image-conversion-report.md', 'image-optimization-summary.json'];
      if (importUpdates.updatedFiles && importUpdates.updatedFiles.length > 0) {
        importUpdates.updatedFiles.forEach(f => toAdd.push(path.join('src', f)));
      }
      execSync(`git add ${toAdd.map(p => `"${p}"`).join(' ')}`, { cwd: PROJECT_ROOT, stdio: 'ignore' });
      logger.success('✔ Staged updated WebP assets and build artifacts to Git commit.');
    } catch {
      // ignore git staging error if git isn't ready
    }
  }

  await cleanAllTempFiles();
  logger.header('Pipeline Completed Successfully');
}

runPipeline().catch(async err => {
  logger.error(`Pipeline execution terminated with fatal error: ${err.message}`);
  await cleanAllTempFiles();
  process.exit(1);
});
