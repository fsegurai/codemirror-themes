/**
 * Every theme is built from the same complete structure (`ThemeDefinition` → `defineTheme`), so every theme styles
 * the same Lezer tags and the same CodeMirror UI parts; themes differ only by palette values.
 */
import { describe, expect, test } from 'bun:test';
import { editorRules, loadAllThemes, resolvedHighlights } from './support/themes';

const themes = await loadAllThemes();

/** Lezer base tags that no theme styled before 6.31. */
const previouslyUnstyledTags = [
  'literal',
  'docString',
  'definitionOperator',
  'typeOperator',
  'controlOperator',
  'content',
  'documentMeta',
];

/** CodeMirror UI parts that no theme styled before 6.31. */
const previouslyUnstyledParts = [
  '.cm-button',
  '.cm-textfield',
  '.cm-panel.cm-gotoLine',
  '.cm-completionMatchedText',
  '.cm-completionInfo',
  '.cm-tooltip-lint',
  '.cm-tooltip-section',
  '.cm-lint-marker',
  '.cm-gutter-lint',
  '.cm-diagnosticAction',
  '.cm-changedLine',
  '.cm-changeGutter',
  '.cm-collapsedLines',
  '.cm-mergeSpacer',
  '.cm-snippetField',
  '.cm-specialChar',
  '.cm-trailingSpace',
  '.cm-highlightSpace',
  '.cm-cursor-secondary',
  '.cm-placeholder',
  '.cm-crosshair',
];

/** Selectors of the editor UI rules, without the generated scope class. */
function uiSelectors(rules: string): string[] {
  return rules.split('\n').map((line) => line.slice(0, line.indexOf(' {')).replace(/^\.ͼ\d+/, '&'));
}

describe.each(themes.map((theme) => [theme.id, theme] as const))('%s', (_id, theme) => {
  test.each(previouslyUnstyledTags)('styles the %s tag', (tag) => {
    expect(resolvedHighlights(theme.extension)[tag]).not.toBe('');
  });

  test.each(previouslyUnstyledParts)('styles the %s UI part', (part) => {
    const selectors = uiSelectors(editorRules(theme.extension));
    expect(selectors.some((selector) => selector.split(/[\s>:]+/).some((piece) => piece.includes(part)))).toBe(true);
  });
});

test('every theme styles the same UI selectors', () => {
  const [first, ...rest] = themes.map((theme) => uiSelectors(editorRules(theme.extension)).join('\n'));
  for (const selectors of rest) expect(selectors).toBe(first);
});
