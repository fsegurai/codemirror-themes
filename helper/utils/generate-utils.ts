// typescript
import fs from 'fs';
import path from 'path';

const helperDir = path.resolve(__dirname); // helper files live next to this script
const packagesDir = path.resolve(process.cwd(), 'packages'); // repo packages folder
const scriptName = path.basename(__filename);

// CLI args: list of filenames relative to `helperDir`. Default to `utils.ts`
const requestedFiles = process.argv.slice(2);
const filesToCopy = requestedFiles.length > 0 ? requestedFiles : ['utils.ts'];

if (!fs.existsSync(helperDir)) {
  console.error('Helper directory not found:', `\`${helperDir}\``);
  process.exit(1);
}

if (!fs.existsSync(packagesDir)) {
  console.error('Packages directory not found:', `\`${packagesDir}\``);
  process.exit(1);
}

// validate requested helper files and keep only existing regular files
const helperFiles = filesToCopy
  .map(f => path.join(helperDir, f))
  .filter(p => {
    try {
      return fs.statSync(p).isFile() && path.basename(p) !== scriptName;
    } catch {
      console.warn('Skipping missing helper file:', `\`${p}\``);
      return false;
    }
  })
  .map(p => path.basename(p)); // store basenames for copying

if (helperFiles.length === 0) {
  console.error('No valid helper files to copy. Provide filenames or ensure defaults exist.');
  process.exit(1);
}

const packageNames = fs.readdirSync(packagesDir).filter(name => {
  const p = path.join(packagesDir, name);
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
});

let totalPackagesTouched = 0;
const perPackageCount: Record<string, number> = {};
const errors: string[] = [];

for (const pkgName of packageNames) {
  if (pkgName === 'bundle') continue;

  const packageSrcDir = path.join(packagesDir, pkgName, 'src');
  if (!fs.existsSync(packageSrcDir)) continue;

  let copiedForPackage = 0;

  for (const file of helperFiles) {
    const srcFile = path.join(helperDir, file);
    const destFile = path.join(packageSrcDir, file);

    try {
      // ensure a source is a regular file (extra safety)
      if (!fs.statSync(srcFile).isFile()) {
        continue;
      }

      fs.copyFileSync(srcFile, destFile);

      try {
        const { mode } = fs.statSync(srcFile);
        fs.chmodSync(destFile, mode);
      } catch {
        // ignore chmod errors on platforms that don't support it
      }

      copiedForPackage++;
      console.log(`Copied ${srcFile} -> ${destFile}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Failed to copy ${srcFile} -> ${destFile}: ${msg}`);
    }
  }

  if (copiedForPackage > 0) {
    totalPackagesTouched++;
    perPackageCount[pkgName] = copiedForPackage;
  }
}

console.log('--------------------------------------');
console.log(`Packages touched: ${totalPackagesTouched}`);
if (Object.keys(perPackageCount).length > 0) {
  console.log('Per-package counts:');
  for (const [pkg, count] of Object.entries(perPackageCount)) {
    console.log(`  - ${pkg}: ${count}`);
  }
}
if (errors.length > 0) {
  console.error('Errors encountered:');
  for (const e of errors) console.error('  ', e);
}
