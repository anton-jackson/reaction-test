import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: '',
    rollupOptions: {
      input: {
        'reaction-time': path.resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js'
      },
    },
  },
}); 