import fs from 'fs';
import path from 'path';
import { readmeTemplate } from './README';

const packagesDir = path.resolve(process.cwd(), 'packages');

/** Utility: derive an import name from the package name */
function deriveImportName(pkgName: string): string {
  const name = pkgName.replace(/^@.*\//, '').replace(/^codemirror-theme-/, '');
  return name
    .split(/[-_.]+/)
    .map((part, i) =>
      i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join('');
}

function fillTemplate(tpl: string, data: Record<string, string>) {
  return tpl
    .replace(/{{NPM_PACKAGE}}/g, data['npmPackage'])
    .replace(/{{IMPORT_NAME}}/g, data['importName'])
    .replace(/{{IMPORT_PATH}}/g, data['importPath']);
}

if (!fs.existsSync(packagesDir)) {
  console.error('Packages directory not found:', `\`${packagesDir}\``);
  process.exit(1);
}

const packageNames = fs.readdirSync(packagesDir).filter((name) => {
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

for (const pkgFolder of packageNames) {
  const pkgDir = path.join(packagesDir, pkgFolder);
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) continue;

  try {
    const raw = fs.readFileSync(pkgJsonPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);

    if (typeof parsed !== 'object' || parsed === null) {
      errors.push(`Invalid package.json structure in \`${pkgJsonPath}\``);
      continue;
    }

    const pkg = parsed as Record<string, unknown>;
    const npmPackage =
      typeof pkg['name'] === 'string' ? pkg['name'] : `@scope/${pkgFolder}`;
    const themeMeta =
      typeof pkg['theme'] === 'object' && pkg['theme'] !== null
        ? (pkg['theme'] as Record<string, unknown>)
        : {};

    const importPath =
      typeof themeMeta['importPath'] === 'string'
        ? themeMeta['importPath']
        : npmPackage;
    const importName =
      typeof themeMeta['importName'] === 'string'
        ? themeMeta['importName']
        : deriveImportName(npmPackage);

    const readme = fillTemplate(readmeTemplate, {
      npmPackage,
      importName,
      importPath,
    });

    const outPath = path.join(pkgDir, 'README.md');
    fs.writeFileSync(outPath, readme, 'utf8');
    totalPackagesTouched++;
    perPackageCount[pkgFolder] = 1;
    console.log('Wrote', outPath);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    errors.push(`Failed to process \`${pkgJsonPath}\`: ${msg}`);
  }
}

console.log('--------------------------------------');
console.log(`Packages touched: ${totalPackagesTouched}`);
if (Object.keys(perPackageCount).length > 0) {
  console.log('Per-package updates:');
  for (const [pkg, count] of Object.entries(perPackageCount)) {
    console.log(`  - ${pkg}: ${count}`);
  }
}
if (errors.length > 0) {
  console.error('Errors encountered:');
  for (const e of errors) console.error('  ', e);
}
