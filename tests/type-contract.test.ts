/**
 * Compile-time contract of the shared theme structure. The probes are type-checked by `tsc` against the real
 * `theme-core` (the tests project cannot import package sources: its rootDir is `tests/`). Each `@ts-expect-error`
 * makes the probe fail to compile if the line below it ever compiles.
 */
import { afterAll, expect, test } from 'bun:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { repoRoot } from './support/themes';

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'theme-type-contract-'));
const core = path.join(repoRoot, 'packages', 'nord', 'src', 'theme-core');

afterAll(() => fs.rmSync(scratch, { recursive: true, force: true }));

/** Type-checks `source` with the repository compiler options; returns the exit code and the diagnostics. */
function typecheck(name: string, source: string): { exitCode: number; output: string } {
  const file = path.join(scratch, `${name}.ts`);
  fs.writeFileSync(file, `import type { BaseSyntaxRoles, ThemeDefinition, UiPalette } from '${core}';\n${source}`);
  const config = path.join(scratch, `${name}.tsconfig.json`);
  fs.writeFileSync(
    config,
    JSON.stringify({
      extends: path.join(repoRoot, 'tsconfig.json'),
      compilerOptions: { noEmit: true, rootDir: path.parse(scratch).root, types: [] },
      files: [file],
    }),
  );
  const result = Bun.spawnSync(['bunx', 'tsc', '-p', config], { cwd: repoRoot });
  return { exitCode: result.exitCode, output: `${result.stdout}${result.stderr}` };
}

test('ThemeDefinition, UiPalette and BaseSyntaxRoles reject incomplete or escape-hatch definitions', () => {
  const result = typecheck(
    'contract',
    [
      '// @ts-expect-error `migration` was removed: themes differ only by palette values.',
      "export const migration: ThemeDefinition['migration'] = undefined;",
      '// @ts-expect-error a palette missing tokens does not compile.',
      "export const ui: UiPalette = { background: '#000', foreground: '#fff' };",
      '// @ts-expect-error a theme missing a base role (here `content`) does not compile.',
      'export const syntax: BaseSyntaxRoles = { keyword: {} };',
    ].join('\n'),
  );
  expect(result.output).toBe('');
  expect(result.exitCode).toBe(0);
});

test('the probe fails when a definition uses `migration`', () => {
  const result = typecheck('migration', "export const migration: ThemeDefinition['migration'] = undefined;");
  expect(result.exitCode).not.toBe(0);
  expect(result.output).toContain("'migration'");
});
