/** Regression tests for reported issues. */
import { describe, expect, test } from 'bun:test';
import { contrastRatio, parseColor } from './support/contrast';
import { loadTheme, resolvedHighlights } from './support/themes';
import { TEXT_MIN, themeSurfaces } from './support/wcag';

const { extension } = await loadTheme('github-light');

describe('#140 github-light token contrast', () => {
  // The issue names keywords/types and numbers/atoms/booleans/constants on the background and the active line.
  // Measure the colors those tags resolve to now, so the test cannot pass just because an old hex disappeared.
  const resolved = resolvedHighlights(extension);
  const surfaces = new Map(themeSurfaces(extension) ?? []);

  for (const tag of ['keyword', 'typeName', 'number', 'atom', 'bool', 'constant(name)']) {
    for (const surface of ['background', 'active-line']) {
      test(`${tag} reaches ${TEXT_MIN}:1 on ${surface}`, () => {
        const hex = resolved[tag]?.match(/(?:^|; )color: ([^;]+)/)?.[1];
        const color = hex ? parseColor(hex) : undefined;
        const back = surfaces.get(surface);
        expect(color).toBeDefined();
        expect(back).toBeDefined();
        if (!color || !back) return;
        expect(contrastRatio(color, back)).toBeGreaterThanOrEqual(TEXT_MIN);
      });
    }
  }
});
