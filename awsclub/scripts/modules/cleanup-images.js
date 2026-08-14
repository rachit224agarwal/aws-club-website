import fs from 'fs-extra';
import glob from 'fast-glob';
import path from 'path';
import { IMAGES_DIR, WEBP_DIR } from './constants.js';
import { logger } from './logger.js';
import { removeCacheEntry } from './image-cache.js';

export async function cleanupOrphanedImages(dryRun = false) {
  if (!dryRun) logger.info('Scanning for orphaned WebP files...');
  const webpFiles = await glob(['**/*.webp'], { cwd: WEBP_DIR, absolute: true });
  
  const deletedFiles = [];

  for (const webpFile of webpFiles) {
    const relativePath = path.relative(WEBP_DIR, webpFile);
    const parsed = path.parse(relativePath);
    
    const possiblePaths = [
      path.join(IMAGES_DIR, parsed.dir, `${parsed.name}.png`),
      path.join(IMAGES_DIR, parsed.dir, `${parsed.name}.jpg`),
      path.join(IMAGES_DIR, parsed.dir, `${parsed.name}.jpeg`)
    ];

    let originalExists = false;
    for (const p of possiblePaths) {
      if (await fs.pathExists(p)) {
        originalExists = true;
        break;
      }
    }

    if (!originalExists) {
      if (!dryRun) {
        await fs.remove(webpFile);
        possiblePaths.forEach(p => removeCacheEntry(p.replace(/\\/g, '/')));
      }
      deletedFiles.push(relativePath.replace(/\\/g, '/'));
      if (!dryRun) {
        logger.info(`Deleted orphaned file: ${relativePath.replace(/\\/g, '/')}`);
      }
    }
  }
  
  if (deletedFiles.length > 0 && !dryRun) {
    logger.success(`Cleaned up ${deletedFiles.length} orphaned WebP files.`);
  }

  return deletedFiles;
}
