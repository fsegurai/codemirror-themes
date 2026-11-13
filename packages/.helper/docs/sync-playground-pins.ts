/**
 * Pins every workspace package in `docs/<root version>/playground/playground.json` to its current
 * `packages/<id>/package.json` version (jsDelivr `dist/index.js`). Samples and third-party pins are kept as they are.
 * Run after `version:update` (the npm script formats the file with Biome); `tests/playground.test.ts` fails when
 * the pins drift.
 *
 * Usage: bun run generate:playground-pins
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const version: string = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
const file = path.join(root, 'docs', version, 'playground', 'playground.json');

if (!fs.existsSync(file)) {
  console.error(`No playground for docs version ${version}: ${file}`);
  process.exit(1);
}

const packagesDir = path.join(root, 'packages');
const workspace = fs
  .readdirSync(packagesDir)
  .filter((dir) => !dir.startsWith('.') && fs.existsSync(path.join(packagesDir, dir, 'package.json')))
  .map(
    (dir) =>
      JSON.parse(fs.readFileSync(path.join(packagesDir, dir, 'package.json'), 'utf8')) as {
        name: string;
        version: string;
      },
  )
  .sort((a, b) => a.name.localeCompare(b.name));

const original = fs.readFileSync(file, 'utf8');
const playground = JSON.parse(original) as { imports: Record<string, string>; [key: string]: unknown };

for (const pkg of workspace) {
  playground.imports[pkg.name] = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/index.js`;
}

fs.writeFileSync(file, `${JSON.stringify(playground, null, 2)}\n`);
console.log(`Pinned ${workspace.length} workspace packages in ${path.relative(root, file)}`);
