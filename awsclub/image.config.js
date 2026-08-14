// Centralized Image Optimization Pipeline Configuration
// Architecture: Modular Node.js Build System

export default {
  // Script and cache schema version for intelligent cache invalidation
  version: '2.1.0',

  // Concurrent worker limit for parallel processing (default: 4-8 workers)
  concurrency: 6,

  // WebP compression parameters (passed to Sharp)
  webp: {
    quality: 80,
    effort: 6,
    lossless: false,
    alphaQuality: 85,
  },

  // Maximum dimension rules per asset category (maintains aspect ratio)
  dimensions: {
    maxLogos: 2000,
    maxEvents: 1600,
    maxPeople: 512,
  },

  // Retry configuration for resilient filesystem operations
  retry: {
    maxAttempts: 3,
    delayMs: 150,
  },

  // Supported raw input image formats
  formats: ['.png', '.jpg', '.jpeg'],

  // Folders to exclude from image discovery and import refactoring
  ignoreFolders: ['node_modules', 'dist', '.git', '.husky', '.agents'],

  // Paths relative to project root
  paths: {
    imagesDir: 'src/assets/images',
    webpDir: 'src/assets/webp',
    cacheFile: '.image-cache.json',
    reportFile: 'image-conversion-report.md',
    manifestFile: 'image-manifest.json',
    ciSummaryFile: 'image-optimization-summary.json',
  },

  // Persistent SHA-256 caching configuration
  cache: {
    enabled: true,
  },

  // CLI logging options
  logging: {
    showProgressBar: true,
  },
};
