/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  base: '/timed-automata-analysis/',
  build: {
    outDir: 'dist/timed-automata-analysis',
    chunkSizeWarningLimit: 1800,
  },
  test: {
    exclude: ['node_modules/**', 'e2e/**'],
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    mockReset: true,
  },
  server: {
    open: true,
  },
});
