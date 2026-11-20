/**
 * Shared helpers have one source in `packages/.helper/utils/` and are copied into every theme package and the core
 * package by `bun run generate:helpers`. A copy edited by hand (or a source changed without regenerating) fails here.
 * The theme core itself is not copied: its single source is `packages/core/src/theme-core.ts`.
 */
import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { packagesDir, themeIds } from './support/themes';

const helperDir = path.join(packagesDir, '.helper', 'utils');
const generatedHelpers = ['utils.ts'];
const helperTargets = [...themeIds(), 'core'];

describe.each(generatedHelpers)('%s', (helper) => {
  const source = fs.readFileSync(path.join(helperDir, helper), 'utf8');

  test.each(helperTargets)('copy in %s matches packages/.helper/utils', (id) => {
    const copy = path.join(packagesDir, id, 'src', helper);
    expect(fs.existsSync(copy)).toBe(true);
    expect(fs.readFileSync(copy, 'utf8')).toBe(source);
  });
});

test('the theme core has a single source', () => {
  expect(fs.existsSync(path.join(helperDir, 'theme-core.ts'))).toBe(false);
  const copies = themeIds().filter((id) => fs.existsSync(path.join(packagesDir, id, 'src', 'theme-core.ts')));
  expect(copies).toEqual([]);
});
