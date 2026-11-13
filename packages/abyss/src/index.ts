import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

// Base colors - Ocean depths
const base00 = '#000c18', // - Background (deep ocean blue)
  base01 = '#a3c9e9', // - Foreground (lighter blue for enhanced readability)
  base02 = '#0e6299', // - Selection (more vibrant blue for better visibility)
  base03 = '#b4a2f7', // - Gutter background (darker for contrast)
  base04 = '#e6d4a3', // - Cursor (warmer gold for better visibility)
  base05 = '#0066ff20', // - Active line (subtle blue tint)
  base06 = '#ffffff', // - Pure white for maximum contrast
  base07 = '#47c1ff', // - Keywords (brighter cyan blue)
  base08 = '#5caeff', // - Variables (softer azure blue)
  base09 = '#7599c2', // - Comments (brighter blue-gray)
  base0A = '#4ce660', // - Strings (kept vibrant green for contrast)
  base0B = '#c3a2f7', // - Functions (softer purple)
  base0C = '#ff9eea', // - Constants (softer pink)
  base0D = '#ffd47b', // - Classes (warmer gold)
  base0E = '#8eb8ff', // - Headings (brighter sky blue)
  base0F = '#59d6ff', // - Tags (brighter cyan)
  base10 = '#ff50c8', // - Links (brighter magenta)
  base11 = '#66ecd4', // - URLs (brighter teal)
  // UI elements
  invalid = '#ff5370',
  darkBackground = '#0a1422', // Darker background for better contrast
  highlightBackground = '#0055ff15',
  tooltipBackground = '#05101d', // Darker tooltip for better contrast
  activeBracketBg = '#0a5999b0',
  // Diff/merge specific colors
  addedBackground = '#0e4e1d50', // Dark green with transparency for insertions
  removedBackground = '#78112240', // Dark red with transparency for deletions
  removedText = '#ff6b7d'; // Bright red for removed text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-selectionLayer': { zIndex: null },
    '.cm-searchMatch': { color: null },
    '.cm-panels': { borderRadius: null },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid #0a3555' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid #0a3555' },
    '.cm-activeLine': { zIndex: null },
    '.cm-gutters': { borderRight: null },
    '.cm-tooltip-autocomplete > ul': { backgroundColor: null, border: null },
    '.cm-foldPlaceholder': { fontStyle: 'italic' },
  },
  highlight: [
    { tag: t.operator, color: '#78b6ff' },
    { tag: [t.bool, t.atom, t.special(t.variableName)], color: '#ff9e64' },
    { tag: [t.bracket, t.brace], color: '#8da0bf' },
    { tag: t.definition(t.name), color: base08 },
  ],
};

const theme = defineTheme({
  name: 'Abyss',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base04,
    selection: base02,
    activeLine: highlightBackground,
    ghostText: base06,
    focusRing: `0 0 0 2px ${base05}, 0 0 0 4px ${base00}`,
    searchMatch: {
      background: '#155ab380',
      outline: base08,
      foreground: base06,
      selectedBackground: '#2a6ac080',
      selectedForeground: base06,
    },
    selectionMatch: { background: '#155ab340', outline: base08 },
    matchingBracket: { background: activeBracketBg, outline: base0F },
    nonMatchingBracket: { background: '#780e1e80', outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: '#0a3555',
      buttonBackground: darkBackground,
      buttonForeground: base01,
      buttonHoverBackground: '#0a3555',
    },
    gutter: {
      background: darkBackground,
      foreground: '#5f7e97',
      activeBackground: highlightBackground,
      activeForeground: base01,
      foldHover: base01,
      border: darkBackground,
    },
    foldPlaceholder: { background: 'transparent', foreground: '#5f7e97', border: base0F },
    tooltip: {
      background: tooltipBackground,
      border: '#084671',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
      selectedBackground: '#084671',
      selectedForeground: '#e0edff',
      icon: '#5f7e97',
      detail: '#5f7e97',
      listBackground: tooltipBackground,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
    },
    diagnostic: { error: invalid, warning: base0A, info: base0B },
    scrollbar: { track: darkBackground, thumb: '#5f7e97', thumbHover: '#4cc9ff' },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#084671',
      buttonColor: base01,
      buttonHoverColor: '#0a3555',
    },
  },
  syntax: {
    keyword: { color: base07, fontWeight: 'bold' },
    definitionKeyword: { color: base07 },
    operatorKeyword: { color: '#78b6ff' },
    modifier: { color: base0C, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: '#8da0bf' },
    bracket: { color: base01 },
    name: { color: base08 },
    variable: { color: '#7ab2ff' },
    localVariable: { color: base0B },
    variableDefinition: { color: base0B },
    function: { color: base0B },
    self: { color: base0C },
    label: { color: base0B },
    property: { color: base0E, fontStyle: 'normal' },
    type: { color: base03 },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0D, fontStyle: 'italic' },
    namespace: { color: base0C, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: '#ffd580' },
    string: { color: base0A },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base09 },
    meta: { color: base09 },
    processingInstruction: { color: base0A },
    annotation: { color: base0C, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0E },
    headingLevel: { color: base0E },
    list: { color: base0E },
    monospace: { color: base0E },
    contentSeparator: { color: base0E },
    link: { color: base10, fontWeight: '500' },
    url: { color: base11, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base0A },
    deleted: { color: base08 },
    changed: { color: base0C },
  },
  migration,
});

/**
 * Combined Abyss theme extension
 */
const abyss: Extension = theme.extension;

/**
 * Abyss merge revert styles configuration
 */
const abyssMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { abyss, abyssMergeStyles, applyMergeRevertStyles };
