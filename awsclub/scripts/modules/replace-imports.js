import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import { execSync } from 'child_process';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import { SRC_DIR, WEBP_DIR, MANIFEST_FILE, PROJECT_ROOT, CONFIG } from './constants.js';
import { logger } from './logger.js';
import { atomicWriteFile, withRetry } from './image-utils.js';

// Ensure compatibility between ESM and CommonJS exports of @babel/traverse
const traverse = _traverse.default || _traverse;

let fileBackups = {};

/**
 * Validates physical existence and integrity of target WebP file before import mapping
 */
function resolveNewPath(imgPath, basenameMap, validWebpSet, dryRun) {
  const baseName = path.basename(imgPath);
  const newRelativePath = basenameMap[baseName];
  if (newRelativePath) {
    const p = newRelativePath.replace(/\\/g, '/');
    if (!dryRun && validWebpSet && !validWebpSet.has(p)) {
      return null; // Do not replace import if the target WebP is missing or larger than original
    }
    const prefixMatch = imgPath.match(/^(.*?)assets\//i);
    const prefix = prefixMatch ? prefixMatch[1] : '';
    return `${prefix}assets/webp/${p}`;
  }
  return null;
}

/**
 * Applies AST parsing to safely update imports in JS, JSX, TS, and TSX files
 */
function updateImportsAST(content, filePath, basenameMap, validWebpSet, dryRun) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
    return null; // Fall back to regex for non-JS/TS files (like CSS or JSON)
  }

  try {
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'importMeta', 'topLevelAwait', 'decorators-legacy'],
      errorRecovery: false,
    });

    const replacements = [];

    const checkAndRecord = (node) => {
      if (node && node.type === 'StringLiteral' && typeof node.value === 'string') {
        if (/\.(png|jpg|jpeg)$/i.test(node.value) && node.value.includes('assets/')) {
          const newPath = resolveNewPath(node.value, basenameMap, validWebpSet, dryRun);
          if (newPath && newPath !== node.value) {
            const quote = content[node.start]; // preserve single, double, or backtick quote
            replacements.push({
              start: node.start,
              end: node.end,
              newText: `${quote}${newPath}${quote}`
            });
          }
        }
      }
    };

    traverse(ast, {
      ImportDeclaration(astPath) {
        checkAndRecord(astPath.node.source);
      },
      CallExpression(astPath) {
        const { callee, arguments: args } = astPath.node;
        if ((callee.type === 'Import' || callee.name === 'require') && args.length > 0) {
          checkAndRecord(args[0]);
        }
      },
      NewExpression(astPath) {
        const { callee, arguments: args } = astPath.node;
        if (callee.name === 'URL' && args.length > 0) {
          checkAndRecord(args[0]);
        }
      }
    });

    if (replacements.length === 0) return content;

    // Apply replacements in reverse order to preserve exact string character indices
    replacements.sort((a, b) => b.start - a.start);
    let newContent = content;
    for (const rep of replacements) {
      newContent = newContent.slice(0, rep.start) + rep.newText + newContent.slice(rep.end);
    }
    return newContent;
  } catch {
    return null;
  }
}

/**
 * Fallback RegExp replacer for non-code files (CSS/SCSS/HTML) or AST syntax anomalies
 */
function updateImportsRegex(content, basenameMap, validWebpSet, dryRun) {
  const regex = /([^'"`]*?)assets\/([^'"`]+?\.(?:png|jpg|jpeg))/gi;
  return content.replace(regex, (match, prefix, imgPath) => {
    const baseName = path.basename(imgPath);
    const newRelativePath = basenameMap[baseName];
    if (newRelativePath) {
      const p = newRelativePath.replace(/\\/g, '/');
      if (!dryRun && validWebpSet && !validWebpSet.has(p)) {
        return match;
      }
      return `${prefix}assets/webp/${p}`;
    }
    return match;
  });
}

export async function replaceImports({ dryRun = false, onlyStaged = false, manifestModified = true } = {}) {
  // If zero files changed in manifest and we are running a staged check, skip scanning completely
  if (!manifestModified && onlyStaged) {
    return { replacedCount: 0, updatedFiles: [] };
  }

  let files = [];
  const ignorePatterns = [
    '**/assets/images/**',
    '**/assets/webp/**',
    ...(CONFIG.ignoreFolders ? CONFIG.ignoreFolders.map(f => `**/${f}/**`) : [])
  ];

  if (onlyStaged) {
    try {
      const gitOut = execSync('git diff --cached --name-only --diff-filter=ACM', { cwd: PROJECT_ROOT, encoding: 'utf8' });
      const stagedList = gitOut.split('\n').map(s => s.trim()).filter(Boolean);
      files = stagedList
        .filter(f => /\.(js|jsx|ts|tsx|css|scss|json|html)$/i.test(f) && f.startsWith('src/'))
        .map(f => path.join(PROJECT_ROOT, f));
    } catch {
      // Fall back to full scan if git invocation fails
      files = await glob(['**/*.{js,jsx,ts,tsx,css,scss,json,html}'], { cwd: SRC_DIR, absolute: true, ignore: ignorePatterns });
    }
  } else {
    files = await glob(['**/*.{js,jsx,ts,tsx,css,scss,json,html}'], { cwd: SRC_DIR, absolute: true, ignore: ignorePatterns });
  }

  if (files.length === 0) {
    return { replacedCount: 0, updatedFiles: [] };
  }

  let manifest = {};
  if (await fs.pathExists(MANIFEST_FILE)) {
    manifest = await withRetry(() => fs.readJson(MANIFEST_FILE));
  }

  const basenameMap = {};
  for (const [key, value] of Object.entries(manifest)) {
    basenameMap[path.basename(key)] = value;
  }

  // Pre-fetch valid WebP asset paths to guarantee zero broken imports are ever inserted
  const validWebpSet = new Set();
  if (!dryRun) {
    const allWebps = await glob(['**/*.webp'], { cwd: WEBP_DIR });
    allWebps.forEach(p => validWebpSet.add(p.replace(/\\/g, '/')));
  }

  let replacedCount = 0;
  const updatedFiles = [];
  if (!dryRun) fileBackups = {};

  for (const file of files) {
    if (!await fs.pathExists(file)) continue;
    const content = await withRetry(() => fs.readFile(file, 'utf8'));
    
    let newContent = updateImportsAST(content, file, basenameMap, validWebpSet, dryRun);
    if (newContent === null) {
      newContent = updateImportsRegex(content, basenameMap, validWebpSet, dryRun);
    }

    if (content !== newContent) {
      updatedFiles.push(path.relative(SRC_DIR, file).replace(/\\/g, '/'));
      if (!dryRun) {
        fileBackups[file] = content;
        await atomicWriteFile(file, newContent, 'utf8');
      }
      replacedCount++;
    }
  }
  
  if (replacedCount > 0 && !dryRun) {
    logger.success(`Updated imports in ${replacedCount} code files.`);
  }

  return { replacedCount, updatedFiles };
}

export async function rollbackImports() {
  const files = Object.keys(fileBackups);
  if (files.length === 0) return;
  
  logger.warn('Rolling back import changes due to build verification failure...');
  for (const file of files) {
    await atomicWriteFile(file, fileBackups[file], 'utf8');
  }
  logger.success('Rollback complete.');
  fileBackups = {};
}
