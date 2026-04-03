import { defineConfig, loadEnv } from 'vite';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'demo',
    base: './',

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      target: 'es2022',
      sourcemap: env.NODE_ENV === 'development',
      minify: 'terser',
      rollupOptions: {
        input: {
          main: 'demo/index.html',
          playground: 'demo/playground.html',
        },
      },
    },
  };
});
