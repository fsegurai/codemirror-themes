/** Regression tests for reported issues. */
import { describe, expect, test } from 'bun:test';
import { loadTheme } from './support/themes';
import { themeFailures } from './support/wcag';

describe('#140 github-light token contrast', async () => {
  const { extension } = await loadTheme('github-light');
  const failures = themeFailures(extension);

  // #d73a49 keywords/types and #e36209 numbers/atoms/booleans/constants, on the background and the active line.
  for (const color of ['#d73a49', '#e36209']) {
    for (const surface of ['background', 'active-line']) {
      test(`${color} is not used below 4.5:1 on ${surface}`, () => {
        expect(failures.filter((f) => f.startsWith(`${color} on ${surface} `))).toEqual([]);
      });
    }
  }
});
