/**
 * Shared helpers have one source in `packages/.helper/utils/` and are copied into every theme package by
 * `bun run generate:helpers`. A copy edited by hand (or a source changed without regenerating) fails here.
 */
import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { packagesDir, themeIds } from './support/themes';

const helperDir = path.join(packagesDir, '.helper', 'utils');
const generatedHelpers = ['utils.ts', 'theme-core.ts'];

describe.each(generatedHelpers)('%s', (helper) => {
  const source = fs.readFileSync(path.join(helperDir, helper), 'utf8');

  test.each(themeIds())('copy in %s matches packages/.helper/utils', (id) => {
    const copy = path.join(packagesDir, id, 'src', helper);
    expect(fs.existsSync(copy)).toBe(true);
    expect(fs.readFileSync(copy, 'utf8')).toBe(source);
  });
});
