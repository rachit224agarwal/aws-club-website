import sharp from 'sharp';
import { CONFIG } from './constants.js';

export async function getResizeOptions(inputPath) {
  const normalizedPath = inputPath.replace(/\\/g, '/');
  const { maxPeople, maxEvents, maxLogos } = CONFIG.dimensions;

  // People Photos: max dimension (default 512x512), maintain aspect ratio
  if (normalizedPath.includes('/people/')) {
    return { width: maxPeople, height: maxPeople, fit: 'inside', withoutEnlargement: true };
  }
  
  // Event Images: max width (default 1600px)
  if (normalizedPath.includes('/events/')) {
    return { width: maxEvents, withoutEnlargement: true };
  }

  // Logos: preserve original dimensions, resize ONLY if larger than threshold
  if (normalizedPath.includes('/logos/')) {
    try {
      const metadata = await sharp(inputPath).metadata();
      if ((metadata.width && metadata.width > maxLogos) || (metadata.height && metadata.height > maxLogos)) {
        return { width: maxLogos, height: maxLogos, fit: 'inside', withoutEnlargement: true };
      }
    } catch {
      // If metadata fails, fall back to safe max dimensions
      return { width: maxLogos, height: maxLogos, fit: 'inside', withoutEnlargement: true };
    }
  }

  return {};
}
