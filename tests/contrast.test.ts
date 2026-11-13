/**
 * WCAG AA contrast ratchet for every theme.
 *
 * Text (syntax tokens and gutter numbers) must reach 4.5:1 against the editor background, the active line
 * and the selection (translucent layers are composited over the background).
 *
 * Known failures live in `contrast-baseline.json`. The test fails when a new failure appears or when a
 * baselined failure is fixed but still listed, so the baseline can only shrink. Rewrite it deliberately with
 * `UPDATE_CONTRAST_BASELINE=1 bun test tests/contrast.test.ts`.
 */

import { expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { loadAllThemes } from './support/themes';
import { themeFailures } from './support/wcag';

const baselinePath = path.join(import.meta.dir, 'contrast-baseline.json');

type Failures = Record<string, string[]>;

/** Compare failures without their ratio, so a partial improvement is not reported as a new failure. */
const keyOf = (failure: string) => failure.replace(/ \([\d.]+\)$/, '');

const themes = await loadAllThemes();
const actual: Failures = {};
for (const theme of themes) {
  const failures = themeFailures(theme.extension);
  if (failures.length > 0) actual[theme.id] = failures;
}

if (process.env['UPDATE_CONTRAST_BASELINE'] === '1') {
  fs.writeFileSync(baselinePath, `${JSON.stringify(actual, null, 2)}\n`);
}

const baseline: Failures = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : {};

test('no new WCAG AA text-contrast failures', () => {
  const added: Failures = {};
  for (const [id, failures] of Object.entries(actual)) {
    const known = new Set((baseline[id] ?? []).map(keyOf));
    const fresh = failures.filter((f) => !known.has(keyOf(f)));
    if (fresh.length > 0) added[id] = fresh;
  }
  expect(added).toEqual({});
});

test('baseline lists only failures that still exist (it can only shrink)', () => {
  const stale: Failures = {};
  for (const [id, failures] of Object.entries(baseline)) {
    const current = new Set((actual[id] ?? []).map(keyOf));
    const fixed = failures.filter((f) => !current.has(keyOf(f)));
    if (fixed.length > 0) stale[id] = fixed;
  }
  expect(stale).toEqual({});
});
