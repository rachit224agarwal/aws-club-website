import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';
import { CONFIG } from './constants.js';

const activeTempFiles = new Set();

export async function cleanAllTempFiles() {
  for (const file of activeTempFiles) {
    try {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    } catch {
      // ignore errors during emergency process termination
    }
  }
  activeTempFiles.clear();
}

export function registerTempFile(filePath) {
  activeTempFiles.add(filePath);
}

export function unregisterTempFile(filePath) {
  activeTempFiles.delete(filePath);
}

export async function withRetry(fn, maxAttempts = CONFIG.retry?.maxAttempts || 3, delayMs = CONFIG.retry?.delayMs || 150) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, delayMs * Math.pow(2, attempt - 1)));
      }
    }
  }
  throw lastError;
}

export async function atomicWriteFile(filePath, content, encoding = 'utf8') {
  await fs.ensureDir(path.dirname(filePath));
  const tempPath = `${filePath}.tmp.${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  registerTempFile(tempPath);
  try {
    await fs.writeFile(tempPath, content, encoding);
    await fs.rename(tempPath, filePath);
  } catch (err) {
    // If cross-device or permission conflict during atomic rename, fall back to copy+remove
    try {
      if (await fs.pathExists(tempPath)) {
        await fs.copy(tempPath, filePath, { overwrite: true });
        await fs.remove(tempPath);
      } else {
        throw err;
      }
    } catch {
      throw err;
    }
  } finally {
    unregisterTempFile(tempPath);
    if (await fs.pathExists(tempPath)) {
      try { await fs.remove(tempPath); } catch { /* ignore */ }
    }
  }
}

export async function atomicWriteJson(filePath, json, options = { spaces: 2 }) {
  const content = JSON.stringify(json, null, options.spaces) + '\n';
  await atomicWriteFile(filePath, content, 'utf8');
}

export async function getFileHash(filePath) {
  return withRetry(() => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (data) => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  }));
}

export async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

export function getWebpPath(originalPath, imagesDir, webpDir) {
  const relativePath = path.relative(imagesDir, originalPath);
  const parsed = path.parse(relativePath);
  const webpRelativePath = path.join(parsed.dir, `${parsed.name}.webp`);
  return path.join(webpDir, webpRelativePath);
}

export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
