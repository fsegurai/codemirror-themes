import fs from 'node:fs';
import path from 'node:path';

const packagesDir = path.resolve(process.cwd(), 'packages');
const bundleDir = path.join(packagesDir, 'bundle');
const bundleIndexPath = path.join(bundleDir, 'src', 'index.ts');
const bundlePkgPath = path.join(bundleDir, 'package.json');

/**
 * Packages whose exported name doesn't match the naive camelCase derivation
 * of the folder name (kept in sync with generate-readme.ts's overrides).
 */
const EXPORT_NAME_OVERRIDES: Record<string, string> = {
  'vscode-dark': 'vsCodeDark',
  'vscode-light': 'vsCodeLight',
};

function deriveExportName(pkgFolder: string, pkgName: string): string {
  if (EXPORT_NAME_OVERRIDES[pkgFolder]) return EXPORT_NAME_OVERRIDES[pkgFolder];
  const name = pkgName.replace(/^@.*\//, '').replace(/^codemirror-theme-/, '');
  return name
    .split(/[-_.]+/)
    .map((part, i) => (i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

if (!fs.existsSync(packagesDir)) {
  console.error('Packages directory not found:', `\`${packagesDir}\``);
  process.exit(1);
}

const themeFolders = fs
  .readdirSync(packagesDir)
  .filter((name) => name !== '.helper' && name !== 'bundle')
  .filter((name) => fs.statSync(path.join(packagesDir, name)).isDirectory())
  .sort((a, b) => a.localeCompare(b));

type ThemeEntry = { folder: string; npmPackage: string; version: string; exportName: string };
const entries: ThemeEntry[] = [];

for (const folder of themeFolders) {
  const pkgJsonPath = path.join(packagesDir, folder, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) continue;

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  if (typeof pkg.name !== 'string' || typeof pkg.version !== 'string') continue;

  entries.push({
    folder,
    npmPackage: pkg.name,
    version: pkg.version,
    exportName: deriveExportName(folder, pkg.name),
  });
}

// Regenerate packages/bundle/src/index.ts — one re-export line per theme.
// applyMergeRevertStyles is identical across every package, so it's re-exported
// once, from the first package alphabetically.
const indexLines = entries.map(({ npmPackage, exportName }, i) => {
  const symbols =
    i === 0
      ? `${exportName}, ${exportName}MergeStyles, applyMergeRevertStyles`
      : `${exportName}, ${exportName}MergeStyles`;
  return `export { ${symbols} } from '${npmPackage}';`;
});
const newIndexContent = `${indexLines.join('\n')}\n`;

const oldIndexContent = fs.existsSync(bundleIndexPath) ? fs.readFileSync(bundleIndexPath, 'utf8') : '';
if (newIndexContent !== oldIndexContent) {
  fs.writeFileSync(bundleIndexPath, newIndexContent, 'utf8');
  console.log(`Updated ${bundleIndexPath}`);
} else {
  console.log(`${bundleIndexPath} already up to date`);
}

// Sync packages/bundle/package.json dependencies: add missing packages, drop
// removed ones. Existing version pins are left untouched — those are owned by
// packages/.helper/versions/update-packages-versions.ts.
const bundlePkg = JSON.parse(fs.readFileSync(bundlePkgPath, 'utf8'));
const currentDeps: Record<string, string> = bundlePkg.dependencies ?? {};
const validNames = new Set(entries.map((e) => e.npmPackage));

const nextDeps: Record<string, string> = {};
for (const { npmPackage, version } of entries) {
  nextDeps[npmPackage] = currentDeps[npmPackage] ?? version;
}

const added = entries.filter((e) => !(e.npmPackage in currentDeps)).map((e) => e.npmPackage);
const removed = Object.keys(currentDeps).filter((name) => !validNames.has(name));

const depsChanged = added.length > 0 || removed.length > 0 || JSON.stringify(currentDeps) !== JSON.stringify(nextDeps);

if (depsChanged) {
  bundlePkg.dependencies = nextDeps;
  fs.writeFileSync(bundlePkgPath, `${JSON.stringify(bundlePkg, null, 2)}\n`, 'utf8');
  console.log(`Updated ${bundlePkgPath}`);
  if (added.length > 0) console.log('  Added:', added.join(', '));
  if (removed.length > 0) console.log('  Removed:', removed.join(', '));
} else {
  console.log(`${bundlePkgPath} dependencies already up to date`);
}
