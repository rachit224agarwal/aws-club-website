import fs from 'fs-extra';
import { CACHE_FILE, CONFIG } from './constants.js';
import { atomicWriteJson, withRetry } from './image-utils.js';

let cache = {};

export async function loadCache() {
  if (!CONFIG.cache.enabled) {
    cache = {};
    return;
  }
  try {
    if (await fs.pathExists(CACHE_FILE)) {
      cache = await withRetry(() => fs.readJson(CACHE_FILE));
    }
  } catch {
    cache = {};
  }
}

export function getCacheEntry(key) {
  return cache[key];
}

export function setCacheEntry(key, data) {
  cache[key] = data;
}

export function removeCacheEntry(key) {
  delete cache[key];
}


export async function isCacheEntryValid(key, currentHash, expectedResizeProfile, outputPath) {
  if (!CONFIG.cache.enabled) return false;
  const entry = cache[key];
  if (!entry) return false;

  // Validate pipeline script and config version
  if (entry.scriptVersion !== CONFIG.version) return false;

  // Validate cryptographic file SHA-256 hash
  if (entry.hash !== currentHash) return false;

  // If conversion was skipped because WebP was larger than original, ensure original still matches
  if (entry.status === 'uncompressed_larger') {
    return true;
  }

  // Verify physical destination WebP file existence and non-zero size
  if (!(await fs.pathExists(outputPath))) return false;
  try {
    const stats = await fs.stat(outputPath);
    if (stats.size === 0) return false;
  } catch {
    return false;
  }

  // Validate compression targets (quality, effort)
  if (JSON.stringify(entry.conversionSettings) !== JSON.stringify(CONFIG.webp)) return false;

  // Validate resize constraints (max dimensions, fit parameters)
  if (JSON.stringify(entry.resizeProfile) !== JSON.stringify(expectedResizeProfile)) return false;

  return true;
}

export async function saveCache(dryRun = false) {
  if (dryRun || !CONFIG.cache.enabled) return;
  await atomicWriteJson(CACHE_FILE, cache, { spaces: 2 });
}
