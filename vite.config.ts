import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // return {
  //   root: 'demo',
  //   base: './',
  //
  //   build: {
  //     outDir: 'dist',
  //     assetsDir: 'assets',
  //     emptyOutDir: true,
  //     target: 'es2022',
  //     sourcemap: env['NODE_ENV'] !== 'production',
  //     minify: 'terser',
  //     rollupOptions: {
  //       input: {
  //         main: 'demo/index.html',
  //         playground: 'demo/playground.html',
  //       },
  //     },
  //   },
  // };
  return {
    root: 'demo',
    envDir: '..',
    server: {
      port: 5173,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: env['NODE_ENV'] !== 'production',
    },
  };
});
