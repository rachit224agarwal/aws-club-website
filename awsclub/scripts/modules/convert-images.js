import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { WEBP_SETTINGS } from './constants.js';
import { getFileSize, withRetry, registerTempFile, unregisterTempFile } from './image-utils.js';

export async function convertToWebp(inputPath, outputPath, resizeOptions, dryRun = false) {
  const originalSize = await getFileSize(inputPath);
  let meta = { width: 0, height: 0, hasAlpha: false };
  try {
    meta = await withRetry(() => sharp(inputPath).metadata());
  } catch {
    // ignore metadata read failure if unsupported
  }

  if (dryRun) {
    const existingSize = await getFileSize(outputPath);
    const estimatedSize = existingSize > 0 ? existingSize : Math.round(originalSize * 0.35);
    
    // If estimated or existing WebP size exceeds original size, skip compression
    if (estimatedSize >= originalSize) {
      return {
        width: resizeOptions.width || meta.width || 0,
        height: resizeOptions.height || meta.height || 0,
        size: originalSize,
        status: 'uncompressed_larger'
      };
    }

    return {
      width: resizeOptions.width || meta.width || 0,
      height: resizeOptions.height || meta.height || 0,
      size: estimatedSize,
      status: 'converted'
    };
  }

  await fs.ensureDir(path.dirname(outputPath));
  let pipeline = sharp(inputPath);
  
  // Apply adaptive resolution scaling
  if (resizeOptions && Object.keys(resizeOptions).length > 0) {
    if (resizeOptions.width || resizeOptions.height) {
      pipeline = pipeline.resize(resizeOptions);
    }
  }

  // Configure adaptive WebP compression settings (strips EXIF metadata by default)
  const adaptiveSettings = { ...WEBP_SETTINGS };
  if (meta.hasAlpha) {
    adaptiveSettings.alphaQuality = WEBP_SETTINGS.alphaQuality || 85;
  }
  if (inputPath.replace(/\\/g, '/').includes('/logos/')) {
    adaptiveSettings.effort = 6; // Apply maximum effort for complex vector-like graphics
  }

  // Atomic file write: output to temporary file first to prevent corruption on abrupt shutdown
  const tempOut = `${outputPath}.tmp.${Date.now()}_${Math.random().toString(36).substring(2, 6)}.webp`;
  registerTempFile(tempOut);

  try {
    const outputInfo = await withRetry(() => pipeline.webp(adaptiveSettings).toFile(tempOut));
    const optimizedSize = outputInfo.size;

    // Reject WebP conversion if the new output turns out larger than the raw original asset
    if (optimizedSize >= originalSize) {
      await fs.remove(tempOut);
      unregisterTempFile(tempOut);
      if (await fs.pathExists(outputPath)) {
        try { await fs.remove(outputPath); } catch { /* ignore */ }
      }
      return {
        width: meta.width || outputInfo.width || 0,
        height: meta.height || outputInfo.height || 0,
        size: originalSize,
        status: 'uncompressed_larger'
      };
    }

    // Atomically commit temporary file to destination with resilient Windows locking fallback
    try {
      await withRetry(() => fs.rename(tempOut, outputPath));
    } catch {
      await withRetry(() => fs.copy(tempOut, outputPath, { overwrite: true }));
      try { await fs.remove(tempOut); } catch { /* ignore */ }
    }
    unregisterTempFile(tempOut);

    return {
      width: outputInfo.width,
      height: outputInfo.height,
      size: optimizedSize,
      status: 'converted'
    };
  } catch (err) {
    unregisterTempFile(tempOut);
    if (await fs.pathExists(tempOut)) {
      try { await fs.remove(tempOut); } catch { /* ignore */ }
    }
    throw err;
  }
}
