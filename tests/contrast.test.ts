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
import { composite, contrastRatio, parseColor, type Rgba, toHex } from './support/contrast';
import { editorCss, loadAllThemes, resolvedHighlights, ruleFor } from './support/themes';

const TEXT_MIN = 4.5;
const baselinePath = path.join(import.meta.dir, 'contrast-baseline.json');

type Failures = Record<string, string[]>;

/** Compare failures without their ratio, so a partial improvement is not reported as a new failure. */
const keyOf = (failure: string) => failure.replace(/ \([\d.]+\)$/, '');

function colorOf(decls: Record<string, string> | undefined, key: string): Rgba | undefined {
  const value = decls?.[key];
  return value ? parseColor(value) : undefined;
}

/** Failure keys for one theme, e.g. `#4c566a on active-line (1.52)`. */
export function themeFailures(extension: Parameters<typeof editorCss>[0]): string[] {
  const css = editorCss(extension);
  const root = ruleFor(css, '&');
  const background = colorOf(root, 'background-color');
  const foreground = colorOf(root, 'color');
  if (!background || background[3] < 1 || !foreground) return ['unresolved editor background or foreground'];

  const surfaces: Array<[string, Rgba]> = [['background', background]];
  const activeLine = colorOf(ruleFor(css, '.cm-activeLine'), 'background-color');
  if (activeLine) surfaces.push(['active-line', composite(activeLine, background)]);
  const selection = colorOf(ruleFor(css, '.cm-selectionBackground'), 'background-color');
  if (selection) surfaces.push(['selection', composite(selection, background)]);

  const failures = new Map<string, number>();
  const check = (label: string, color: Rgba, surfaceName: string, surface: Rgba) => {
    const ratio = contrastRatio(color, surface);
    if (ratio >= TEXT_MIN) return;
    const key = `${label} on ${surfaceName}`;
    failures.set(key, Math.min(failures.get(key) ?? Number.POSITIVE_INFINITY, ratio));
  };

  const textColors = new Set<string>([toHex(foreground)]);
  for (const decls of Object.values(resolvedHighlights(extension))) {
    const match = decls.match(/(?:^|; )color: ([^;]+)/);
    const color = match ? parseColor(match[1]) : foreground;
    if (color) textColors.add(color[3] < 1 ? `${toHex(color)}/${color[3].toFixed(2)}` : toHex(color));
  }
  for (const label of textColors) {
    const [hex, alpha] = label.split('/');
    const color = parseColor(hex) as Rgba;
    if (alpha) color[3] = Number(alpha);
    for (const [name, surface] of surfaces) check(label, color, name, surface);
  }

  const gutters = ruleFor(css, '.cm-gutters');
  const gutterText = colorOf(gutters, 'color');
  const gutterBg = colorOf(gutters, 'background-color');
  if (gutterText) {
    const surface = gutterBg ? composite(gutterBg, background) : background;
    check(`gutter ${toHex(gutterText)}`, gutterText, 'gutter', surface);
  }

  return [...failures].map(([key, ratio]) => `${key} (${ratio.toFixed(2)})`).sort();
}

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
