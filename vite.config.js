import { defineConfig } from 'vite';
import process from 'node:process';

const { NODE_ENV, HOST_URL } = process.env;

export default defineConfig({
  root: './demo',
  build: {
    chunkSizeWarningLimit: 600, // Increase threshold to 600 kB
    outDir: '../demo/dist',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './demo/index.html',
      },
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
  },
  define: {
    'NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
    'HOST_URL': JSON.stringify(HOST_URL || ''),
  },
});
