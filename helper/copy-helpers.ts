import fs from 'fs';
import path from 'path';

let cont = 0;
const helperDir: string = path.resolve('./helper/src'); // Directory containing the helper files
const packagesDir: string = path.resolve('./packages'); // Directory containing the packages

/**
 * Copies utility files from the helper directory to each package's `src` directory.
 * This script skips packages that do not have a `src` directory or the `bundle` package.
 * It logs the number of files copied.
 * @returns {void}
 */
fs.readdirSync(packagesDir).forEach((packageName: string): void => {
  const packageSrcDir: string = path.join(packagesDir, packageName, 'src');

  if (!fs.existsSync(packageSrcDir)) return; // Skip if the package does not have a `src` directory
  if (packageName === 'bundle') return; // Skip the `bundle` package

  fs.readdirSync(helperDir).forEach((file: string) => {
    const srcFile: string = path.join(helperDir, file);
    const destFile: string = path.join(packageSrcDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${srcFile} to ${destFile}`);
    cont++;
  });
});

console.log('--------------------------------------');
console.log(`Copied utils files to ${cont} packages.`);
