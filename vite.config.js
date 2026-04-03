import { defineConfig } from 'vite';
import process from 'node:process';

const { NODE_ENV, HOST_URL } = process.env;

export default defineConfig({
  root: './demo',
  build: {
    chunkSizeWarningLimit: 600,
    outDir: '../demo/dist',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './demo/index.html',
        header: './demo/scripts/header.ts',
        index: './demo/scripts/index.ts',
        playground: './demo/scripts/playground.ts',
      },
      output: {
        entryFileNames: 'scripts/[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: (id) => {
          // Don't chunk Prism components - keep them inline
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
