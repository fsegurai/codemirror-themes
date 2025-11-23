import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dev from 'rollup-plugin-dev';
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, HOST_URL } = process.env;
const OUTPUT_DIR = './demo/dist';

export default {
  input: [
    './demo/scripts/index.ts',
    './demo/scripts/header.ts',
    './demo/scripts/playground.ts',
  ],
  output: [
    {
      format: 'esm',
      dir: OUTPUT_DIR,
      externalLiveBindings: false,
    },
  ],
  external: [],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        outDir: OUTPUT_DIR,
        target: 'es6',
        strict: false,
      },
      allowSyntheticDefaultImports: true,
    }),
    resolve(),
    commonjs(),
    replace({
      values: { HOST_URL: HOST_URL, NODE_ENV: NODE_ENV },
      preventAssignment: true,
    }),
    dev({
      dirs: ['demo'],
      host: 'localhost',
      port: 8000,
    }),
  ],
};
