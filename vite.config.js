import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  publicDir: 'public',

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src')
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});