/**
 * The Arkodex playground loads theme packages from jsDelivr through `docs/<version>/playground/playground.json`.
 * Theme package versions differ from the docs version, so the pins are explicit and must match the workspace
 * packages of the latest docs version, otherwise the playground silently runs stale theme code.
 */

import { expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { packagesDir, repoRoot } from './support/themes';

const docsDir = path.join(repoRoot, 'docs');
const rootVersion: string = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')).version;
const playgroundPath = path.join(docsDir, rootVersion, 'playground', 'playground.json');

const workspaceVersions = new Map<string, string>();
for (const dir of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, dir, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { name: string; version: string };
  workspaceVersions.set(pkg.name, pkg.version);
}

test.if(fs.existsSync(playgroundPath))('playground import map pins match workspace package versions', () => {
  const { imports } = JSON.parse(fs.readFileSync(playgroundPath, 'utf8')) as { imports: Record<string, string> };
  const mismatches: string[] = [];
  for (const [name, url] of Object.entries(imports)) {
    const expected = workspaceVersions.get(name);
    if (!expected) continue;
    const pinned = url.match(new RegExp(`${name.replace('/', '\\/')}@([^/]+)/`))?.[1];
    if (pinned !== expected) mismatches.push(`${name}: pinned ${pinned ?? '(none)'}, workspace ${expected}`);
  }
  expect(mismatches).toEqual([]);
});
