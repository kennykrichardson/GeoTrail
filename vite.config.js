import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [tailwindcss()],

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
