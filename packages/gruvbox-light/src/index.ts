import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Gruvbox Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const base00 = '#3c3836', // Main foreground (text)
  base01 = '#504945', // Secondary foreground
  base02 = '#665c54', // Tertiary foreground
  base03 = '#7c6f64', // Quaternary foreground
  base04 = '#928374', // Comments, invisibles, line highlighting
  // Light/background shades
  base05 = '#fbf1c7', // Main background
  base06 = '#ebdbb2', // Secondary background
  base07 = '#d5c4a1', // Tertiary background (not defined above)
  base08 = '#bdae93', // Quaternary background
  base09 = '#a89984', // Quinary background (not defined above)
  // Accent colors
  base0A = '#9d0006', // Keywords, storage, operator
  base0B = '#79740e', // Strings, tag attributes
  base0C = '#b57614', // Functions, tag names
  base0D = '#076678', // Variables
  base0E = '#8f3f71', // Numbers, special constants
  base0F = '#427b58', // Types
  base10 = '#af3a03'; // Cursor, constants

// UI specific colors
const highlightBackground = '#ffc42e25', // Line highlight with transparency
  selectionMatch = '#ffc42e40', // Selection match background
  activeBracketBg = '#d5c4a180'; // Active bracket background

// Diff/merge specific colors
const addedBackground = '#d8e5bc80', // Light base0B with transparency for insertions
  removedBackground = '#f7cfcf80'; // Light base0A with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { color: base00 },
    '.cm-panels': { color: base01, borderRadius: '0 0 4px 4px' },
    '.cm-tooltip-autocomplete > ul > li:hover': { backgroundColor: `${base10}15` },
  },
  highlight: [
    { tag: t.null, color: base0E },
    { tag: t.definition(t.function(t.variableName)), color: base0D },
  ],
};

const theme = defineTheme({
  name: 'Gruvbox Light',
  dark: false,
  ui: {
    background: base05,
    foreground: base00,
    cursor: base10,
    selection: base06,
    activeLine: highlightBackground,
    ghostText: base04,
    focusRing: `0 0 0 2px ${base05}, 0 0 0 3px ${base10}40`,
    searchMatch: {
      background: '#ffc42e80',
      outline: base10,
      foreground: base00,
      selectedBackground: base10,
      selectedForeground: base05,
    },
    selectionMatch: { background: selectionMatch, outline: base08 },
    matchingBracket: { background: activeBracketBg, outline: base10 },
    nonMatchingBracket: { background: '#fb492740', outline: base0A },
    panel: {
      background: base06,
      foreground: base00,
      border: base08,
      buttonBackground: base05,
      buttonForeground: base00,
      buttonHoverBackground: base07,
    },
    gutter: {
      background: base06,
      foreground: base03,
      border: base08,
      activeBackground: base07,
      activeForeground: base00,
      foldHover: base00,
    },
    foldPlaceholder: { background: 'transparent', foreground: base02, border: base08 },
    tooltip: {
      background: base06,
      border: base08,
      shadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
      listBackground: base06,
      selectedBackground: `${base10}30`,
      selectedForeground: base00,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0B,
      deletedBackground: removedBackground,
      deletedForeground: base0A,
    },
    diagnostic: { error: base0A, warning: base0C, info: base0D },
    scrollbar: { track: base05, thumb: base08, thumbHover: base09 },
    merge: {
      backgroundColor: base06,
      borderColor: base08,
      buttonColor: base00,
      buttonHoverColor: base07,
    },
  },
  syntax: {
    keyword: { color: base0A, fontWeight: 'bold' },
    definitionKeyword: { color: base0A },
    modifier: { color: base0E, fontStyle: 'italic' },
    operator: { color: base00 },
    punctuation: { color: base04 },
    name: { color: base0D },
    function: { color: base0C },
    self: { color: base0E },
    label: { color: base0C },
    property: { color: base0F, fontStyle: 'normal' },
    type: { color: base0F },
    typeDefinition: { color: base0F, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base0D, fontStyle: 'italic' },
    tag: { color: base0A },
    attribute: { color: base0C },
    string: { color: base0B },
    number: { color: base0E },
    constant: { color: base10 },
    comment: { fontStyle: 'italic', color: base04 },
    meta: { color: base04 },
    processingInstruction: { color: base0B },
    annotation: { color: base0A, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0C },
    headingLevel: { color: base0C },
    list: { color: base0C },
    quote: { color: base04 },
    monospace: { color: base00 },
    contentSeparator: { color: base0D },
    link: {
      color: base0E,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0D, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base0C },
    strikethrough: { color: base0A, textDecoration: 'line-through' },
    invalid: { color: base00, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0A}` },
    inserted: { color: base0B },
    deleted: { color: base0A },
    changed: { color: base0E },
  },
  migration,
});

/**
 * Combined Gruvbox Light theme extension
 */
const gruvboxLight: Extension = theme.extension;

/**
 * Gruvbox Light merge revert styles configuration
 */
const gruvboxLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, gruvboxLight, gruvboxLightMergeStyles };
