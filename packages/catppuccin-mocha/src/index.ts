import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Catppuccin Mocha theme color definitions
 * ----------------------------------------
 * A soothing pastel theme with warm tones
 */

// Base colors (Mocha variant)
const base00 = '#1e1e2e', // Background - dark navy
  base01 = '#313244', // Selection background
  base02 = '#45475a', // Comments
  base03 = '#585b70', // Dark grey
  base04 = '#cdd6f4', // Foreground - light blue
  base05 = '#f5e0dc', // Light foreground
  // Catppuccin Mocha colors
  flamingo = '#f2cdcd',
  pink = '#f5c2e7',
  mauve = '#cba6f7',
  red = '#f38ba8',
  maroon = '#eba0ac',
  peach = '#fab387',
  yellow = '#f9e2af',
  green = '#a6e3a1',
  teal = '#94e2d5',
  sky = '#89dceb',
  sapphire = '#74c7ec',
  blue = '#89b4fa',
  lavender = '#b4befe';

// UI specific colors
const darkBackground = '#181825',
  selectionMatch = '#45475a80',
  activeBracketBg = '#45475a55';

// Diff/merge specific colors
const addedBackground = '#a6e3a140',
  removedBackground = '#f38ba840';

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { outline: `1px solid ${mauve}` },
    '.cm-activeLine': { borderLeft: `2px solid ${lavender}` },
  },
  highlight: [
    { tag: [t.separator, t.definition(t.name)], color: flamingo },
    { tag: t.angleBracket, color: sky },
    { tag: t.squareBracket, color: maroon },
    { tag: t.brace, color: teal },
  ],
};

const theme = defineTheme({
  name: 'Catppuccin Mocha',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
    cursor: base05,
    selection: `${base03}80`,
    activeLine: '#3a3a5266',
    ghostText: base02,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${lavender}40`,
    searchMatch: {
      background: `${blue}40`,
      outline: sapphire,
      foreground: base04,
      selectedBackground: blue,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base01}50` },
    matchingBracket: { background: activeBracketBg, outline: lavender },
    nonMatchingBracket: { background: removedBackground, outline: red },
    panel: {
      background: darkBackground,
      foreground: base04,
      border: base02,
      buttonBackground: base01,
      buttonForeground: base04,
      buttonHoverBackground: base01,
    },
    gutter: {
      background: darkBackground,
      foreground: base02,
      border: base01,
      activeBackground: base01,
      activeForeground: base04,
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base02, border: `${base02}70` },
    tooltip: {
      background: base01,
      border: base02,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      selectedBackground: base01,
      selectedForeground: base05,
      icon: base02,
      detail: base02,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: green,
      deletedBackground: removedBackground,
      deletedForeground: red,
    },
    diagnostic: { error: red, warning: yellow, info: blue },
    scrollbar: { track: darkBackground, thumb: base01, thumbHover: base02 },
    merge: {
      backgroundColor: darkBackground,
      borderColor: base02,
      buttonColor: base04,
      buttonHoverColor: base01,
    },
  },
  syntax: {
    keyword: { color: mauve, fontWeight: 'bold' },
    definitionKeyword: { color: mauve },
    modifier: { color: mauve, fontStyle: 'italic' },
    operator: { color: sky },
    punctuation: { color: base03 },
    name: { color: base04 },
    localVariable: { color: peach },
    variableDefinition: { color: peach },
    function: { color: blue },
    self: { color: red },
    label: { color: blue },
    property: { color: blue, fontStyle: 'normal' },
    type: { color: yellow },
    typeDefinition: { color: yellow, fontWeight: 'bold' },
    className: { color: yellow, fontStyle: 'italic' },
    namespace: { color: peach, fontStyle: 'italic' },
    tag: { color: pink },
    attribute: { color: yellow },
    string: { color: green },
    regexp: { color: pink },
    number: { color: peach },
    constant: { color: peach },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base02 },
    processingInstruction: { color: green },
    annotation: { color: red, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: mauve },
    headingLevel: { color: mauve },
    list: { color: mauve },
    quote: { color: lavender },
    monospace: { color: teal, fontStyle: 'italic' },
    contentSeparator: { color: sapphire },
    link: {
      color: mauve,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: blue, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: pink },
    strong: { fontWeight: 'bold', color: maroon },
    strikethrough: { color: red, textDecoration: 'line-through' },
    invalid: { color: red, textDecoration: 'underline wavy', borderBottom: `1px wavy ${red}` },
    inserted: { color: green },
    deleted: { color: red },
    changed: { color: yellow },
  },
  migration,
});

/**
 * Combined Catppuccin Mocha theme extension
 */
const catppuccinMocha: Extension = theme.extension;

/**
 * Catppuccin Mocha merge revert styles configuration
 */
const catppuccinMochaMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, catppuccinMocha, catppuccinMochaMergeStyles };
