/**
 * WCAG AA text contrast without exceptions: every theme passes, and selections stay visible.
 *
 * `contrast.test.ts` keeps the ratchet mechanism; this test pins its end state, so a failure can never be added back
 * to `contrast-baseline.json` silently.
 */

import { describe, expect, test } from 'bun:test';
import { contrastRatio } from './support/contrast';
import { loadAllThemes } from './support/themes';
import { themeFailures, themeSurfaces } from './support/wcag';

/** Minimum contrast between the composited selection and the editor background, so a selection stays visible. */
const SELECTION_MIN = 1.2;

const themes = await loadAllThemes();

describe.each(themes.map((theme) => [theme.id, theme] as const))('%s', (_id, theme) => {
  test('every text color reaches 4.5:1 on the background, active line, selection and gutter', () => {
    expect(themeFailures(theme.extension)).toEqual([]);
  });

  test(`the selection differs from the background by at least ${SELECTION_MIN}:1`, () => {
    const surfaces = new Map(themeSurfaces(theme.extension));
    const background = surfaces.get('background');
    const selection = surfaces.get('selection');
    expect(background).toBeDefined();
    expect(selection).toBeDefined();
    if (!background || !selection) return;
    expect(contrastRatio(selection, background)).toBeGreaterThanOrEqual(SELECTION_MIN);
  });
});
