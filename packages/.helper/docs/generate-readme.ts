import fs from 'node:fs';
import path from 'node:path';
import { readmeTemplate } from './README';

const packagesDir = path.resolve(process.cwd(), 'packages');

/**
 * Packages whose real named export doesn't match the naive camelCase derivation
 * of the folder name. `bundle` has no single `bundle` export — it re-exports
 * every theme individually, so `abcdef` is shown as a representative sample.
 */
const IMPORT_NAME_OVERRIDES: Record<string, string> = {
  'vscode-dark': 'vsCodeDark',
  'vscode-light': 'vsCodeLight',
  bundle: 'abcdef',
};

/** Packages whose themes-table display title isn't a naive Title Case of the folder name */
const THEME_TITLE_OVERRIDES: Record<string, string> = {
  bundle: 'All - Bundle',
  'github-dark': 'GitHub Dark',
  'github-light': 'GitHub Light',
  'vscode-dark': 'VS Code Dark',
  'vscode-light': 'VS Code Light',
};

/** Utility: derive an import name from the package folder/name */
function deriveImportName(pkgFolder: string, pkgName: string): string {
  if (IMPORT_NAME_OVERRIDES[pkgFolder]) return IMPORT_NAME_OVERRIDES[pkgFolder];
  const name = pkgName.replace(/^@.*\//, '').replace(/^codemirror-theme-/, '');
  return name
    .split(/[-_.]+/)
    .map((part, i) => (i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

/** Utility: derive a themes-table display title from the folder name */
function deriveThemeTitle(pkgFolder: string): string {
  if (THEME_TITLE_OVERRIDES[pkgFolder]) return THEME_TITLE_OVERRIDES[pkgFolder];
  return pkgFolder
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function fillTemplate(tpl: string, data: Record<string, string>) {
  return tpl
    .replace(/{{NPM_PACKAGE}}/g, data.npmPackage)
    .replace(/{{IMPORT_NAME}}/g, data.importName)
    .replace(/{{IMPORT_PATH}}/g, data.importPath)
    .replace(/{{THEMES_TABLE}}/g, data.themesTable);
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

/** Build the "Available Themes" table once, from every publishable package. */
const themeEntries: { folder: string; npmPackage: string }[] = [];
for (const pkgFolder of packageNames) {
  if (pkgFolder === '.helper') continue;
  const pkgJsonPath = path.join(packagesDir, pkgFolder, 'package.json');
  if (!fs.existsSync(pkgJsonPath)) continue;
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    if (typeof parsed !== 'object' || parsed === null) continue;
    const pkg = parsed as Record<string, unknown>;
    const npmPackage = typeof pkg.name === 'string' ? pkg.name : `@scope/${pkgFolder}`;
    themeEntries.push({ folder: pkgFolder, npmPackage });
  } catch {
    // Malformed package.json is reported per-package by the main loop below.
  }
}
themeEntries.sort((a, b) => a.folder.localeCompare(b.folder));

const themesTable = [
  '| Theme               | Package                                                                | Version                                          |',
  '|---------------------|-------------------------------------------------------------------------|---------------------------------------------------|',
  ...themeEntries.map(({ folder, npmPackage }) => {
    const title = deriveThemeTitle(folder);
    return `| ${title} | [${npmPackage}](https://www.npmjs.com/package/${npmPackage}) | ![npm](https://img.shields.io/npm/v/${npmPackage}) |`;
  }),
].join('\n');

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
    const npmPackage = typeof pkg.name === 'string' ? pkg.name : `@scope/${pkgFolder}`;
    const themeMeta = typeof pkg.theme === 'object' && pkg.theme !== null ? (pkg.theme as Record<string, unknown>) : {};

    const importPath = typeof themeMeta.importPath === 'string' ? themeMeta.importPath : npmPackage;
    const importName =
      typeof themeMeta.importName === 'string' ? themeMeta.importName : deriveImportName(pkgFolder, npmPackage);

    const readme = fillTemplate(readmeTemplate, {
      npmPackage,
      importName,
      importPath,
      themesTable,
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
