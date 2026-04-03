import { defineConfig } from 'vite';

const { NODE_ENV = 'development', HOST_URL = '' } = import.meta.env;

export default defineConfig({
  root: 'demo',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
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
    '#NODE_ENV#': JSON.stringify(NODE_ENV),
    '#HOST_URL#': JSON.stringify(HOST_URL),
  },
});
