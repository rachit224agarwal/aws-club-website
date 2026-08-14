import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';
import { logger } from './logger.js';

export async function validateImage(filePath) {
  try {
    const stats = await fs.stat(filePath);
    if (stats.size === 0) {
      logger.warn(`Skipping zero-byte file: ${path.basename(filePath)}`);
      return false;
    }
    
    const ext = path.extname(filePath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      logger.warn(`Skipping unsupported format: ${path.basename(filePath)}`);
      return false;
    }

    // Verify it's not corrupted
    await sharp(filePath).metadata();
    return true;
  } catch (err) {
    logger.warn(`Skipping invalid or corrupted image: ${path.basename(filePath)} - ${err.message}`);
    return false;
  }
}
