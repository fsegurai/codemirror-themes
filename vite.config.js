import { defineConfig } from 'vite';
import process from 'node:process';

const { NODE_ENV, HOST_URL } = process.env;

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 600,
    outDir: './demo/dist',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: [
        './demo/scripts/index.ts',
        './demo/scripts/header.ts',
        './demo/scripts/playground.ts',
      ],
      output: {
        format: 'esm',
        dir: './demo/dist',
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: (id) => {
          if (id.includes('prismjs')) {
            return undefined;
          }
        },
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
