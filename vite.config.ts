import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  esbuild: {
    target: 'es2022',
    supported: {
      'top-level-await': true,
    },
  },
  base: '/timed-automata-analysis/',
  build: {
    outDir: 'dist/timed-automata-analysis',
    chunkSizeWarningLimit: 1100,
  },
  server: {
    open: true,
  },
});
