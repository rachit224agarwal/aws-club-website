import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),

    ViteImageOptimizer({
      // Performance
      cache: true,
      cacheLocation: './node_modules/.cache/vite-plugin-image-optimizer',
      logStats: true,
      exclude: [/\.svg$/, /\.webp$/],
      webp: false,
      svg: false,

      // PNG (for any remaining PNGs such as temporary assets)
      png: {
        compressionLevel: 9,
        palette: false,
      },

      // JPG
      jpg: {
        quality: 75,
        mozjpeg: true,
        progressive: true,
      },

      // JPEG
      jpeg: {
        quality: 75,
        mozjpeg: true,
        progressive: true,
      },
    }),
  ],

  build: {
    target: 'esnext',

    cssCodeSplit: true,

    sourcemap: false,

    reportCompressedSize: true,

    chunkSizeWarningLimit: 1000,

    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
        },

        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})