/**
 * Shared UI accessibility of every theme:
 * - non-text indicators (cursor, focus ring, matching bracket, current search match) reach 3:1 (WCAG 1.4.11);
 * - a selection stays visible on the active line;
 * - merge-view `del`/`ins` rules never style plain `del`/`ins` elements of the editor content or host page.
 */
import { describe, expect, test } from 'bun:test';
import { loadAllThemes } from './support/themes';
import {
  NON_TEXT_MIN,
  nonTextFailures,
  SELECTION_ON_ACTIVE_LINE_MIN,
  selectionOnActiveLineRatio,
  unscopedDiffSelectors,
} from './support/wcag';

const themes = await loadAllThemes();

describe.each(themes.map((theme) => [theme.id, theme] as const))('%s', (_id, theme) => {
  test(`cursor, focus ring, matching bracket and current search match reach ${NON_TEXT_MIN}:1`, () => {
    expect(nonTextFailures(theme.extension)).toEqual([]);
  });

  test(`the selection differs from the active line by at least ${SELECTION_ON_ACTIVE_LINE_MIN}:1`, () => {
    const ratio = selectionOnActiveLineRatio(theme.extension);
    expect(ratio).toBeDefined();
    expect(ratio ?? 0).toBeGreaterThanOrEqual(SELECTION_ON_ACTIVE_LINE_MIN);
  });

  test('no rule targets a del or ins element outside a .cm-* context', () => {
    expect(unscopedDiffSelectors(theme.extension)).toEqual([]);
  });
});
