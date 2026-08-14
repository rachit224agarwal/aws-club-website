import fs from 'fs-extra';
import glob from 'fast-glob';
import { exec } from 'child_process';
import path from 'path';
import { SRC_DIR, WEBP_DIR, PROJECT_ROOT, CONFIG } from './constants.js';
import { logger } from './logger.js';

export async function verifyImages(dryRun = false) {
  if (dryRun) {
    logger.info('Dry-Run Mode: Skipping physical WebP file verification.');
    return;
  }

  logger.info('Verifying image imports...');
  const ignorePatterns = [
    '**/assets/images/**',
    '**/assets/webp/**',
    ...(CONFIG.ignoreFolders ? CONFIG.ignoreFolders.map(f => `**/${f}/**`) : [])
  ];

  const files = await glob(['**/*.{js,jsx,ts,tsx,css,scss,json,html}'], {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ignorePatterns
  });

  let hasErrors = false;
  const webpRegex = /([^'"]*?assets\/webp\/)([^'"]+?\.webp)/g;

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    let match;
    while ((match = webpRegex.exec(content)) !== null) {
      const p2 = match[2];
      const fullPath = path.join(WEBP_DIR, p2);
      if (!await fs.pathExists(fullPath)) {
        logger.error(`Missing WebP file referenced in ${file}:\n-> ${fullPath}`);
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    throw new Error('Image verification failed: Missing WebP files.');
  }

  logger.success('All referenced WebP images exist.');
}

export function runBuild(dryRun = false) {
  if (dryRun) {
    logger.info('Dry-Run Mode: Skipping trial production build.');
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    logger.info('Running production build verification...');
    exec('npm run build', { cwd: PROJECT_ROOT }, (error, stdout, stderr) => {
      if (error) {
        logger.error('Build verification failed.');
        console.error(stdout);
        console.error(stderr);
        reject(error);
      } else {
        logger.success('Build verification successful.');
        resolve();
      }
    });
  });
}

if (process.argv[1] && process.argv[1].endsWith('verify-images.js')) {
  verifyImages().catch(err => {
    logger.error(err.message);
    process.exit(1);
  });
}
