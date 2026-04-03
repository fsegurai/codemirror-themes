import { defineConfig } from 'vite';
import process from 'node:process';

const { NODE_ENV, HOST_URL } = process.env;

export default defineConfig({
  root: 'demo',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: NODE_ENV === 'development',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: 'demo/index.html',
        playground: 'demo/playground.html',
      },
    },
  },
  define: {
    'NODE_ENV': JSON.stringify(NODE_ENV || 'development'),
    'HOST_URL': JSON.stringify(HOST_URL || ''),
  },
});
