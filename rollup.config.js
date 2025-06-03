import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dev from 'rollup-plugin-dev';
import fs from 'fs';
import path from 'path';
import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, HOST_URL } = process.env;
const OUTPUT_DIR = './demo/dist';

/**
 * Copies utils.ts from the helper package to each theme's src directory.
 * @returns { name: string, buildStart: Function, watchChange: Function }
 */
function copyUtilsToThemes() {
  let initialBuild = true;
  const utilsPath = path.resolve('./packages/.helper/utils.ts');
  
  return {
    name: 'copy-utils',
    buildStart() {
      // Copy utils on initial build or when utils.ts changes
      if (initialBuild) {
        copyUtils();
        initialBuild = false;
      }
      
      // Add the utils file to the watch list
      this.addWatchFile(utilsPath);
    },
    // Handle file changes during watch mode
    watchChange(id) {
      if (id === utilsPath) {
        copyUtils();
      }
    },
  };
  
  /**
   * Copies the utils.ts file to each theme's src directory.
   * This function reads the utils.ts file from the helper package and writes it
   */
  function copyUtils() {
    const utilsContent = fs.readFileSync(utilsPath, 'utf8');
    const packagesDir = path.resolve('./packages');
    const themeDirs = fs.readdirSync(packagesDir)
      .filter(dir => dir !== '.helper' && dir !== 'bundle')
      .map(dir => path.join(packagesDir, dir));
    
    themeDirs.forEach(dir => {
      const srcDir = path.join(dir, 'src');
      if (fs.existsSync(srcDir)) {
        fs.writeFileSync(path.join(srcDir, 'utils.ts'), utilsContent);
      }
    });
  }
}

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
    copyUtilsToThemes(),
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
