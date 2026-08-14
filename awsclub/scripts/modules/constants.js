import path from 'path';
import { fileURLToPath } from 'url';
import config from '../../image.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
export const CONFIG = config;
export const SRC_DIR = path.join(PROJECT_ROOT, 'src');

export const IMAGES_DIR = path.join(PROJECT_ROOT, config.paths.imagesDir);
export const WEBP_DIR = path.join(PROJECT_ROOT, config.paths.webpDir);
export const CACHE_FILE = path.join(PROJECT_ROOT, config.paths.cacheFile);
export const REPORT_FILE = path.join(PROJECT_ROOT, config.paths.reportFile);
export const MANIFEST_FILE = path.join(PROJECT_ROOT, config.paths.manifestFile);
export const CI_SUMMARY_FILE = path.join(PROJECT_ROOT, config.paths.ciSummaryFile);

export const WEBP_SETTINGS = config.webp;
