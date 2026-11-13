import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Material Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#212121', // Background
  base01 = '#505d64', // Lighter background (popups, statuslines)
  base02 = '#606f7a', // Selection background
  base03 = '#707d8b', // Comments, invisibles, line highlighting
  base04 = '#a0a4ae', // Dark foreground (cursor)
  base05 = '#bdbdbd', // Default foreground
  base06 = '#e0e0e0', // Light foreground
  base07 = '#202325', // Dark background (gutter)
  // Accent colors
  base08 = '#ff5f52', // Keywords, storage, errors
  base09 = '#ff6e40', // Constants, attributes
  base0A = '#fa5788', // Regex, special symbols
  base0B = '#facf4e', // Classes, numbers
  base0C = '#ffad42', // Strings, values
  base0D = '#56c8d8', // Support, functions
  base0E = '#7186f0', // Variables, parameters
  base0F = '#cf6edf', // Operators, tags
  base10 = '#6abf69', // Added elements
  base11 = '#99d066', // Modified elements
  base12 = '#4ebaaa'; // Markup headings

// UI specific colors
const highlightBackground = '#2d333b30', // Line highlight with transparency
  selection = '#ffffff1f', // Selection background with transparency
  selectionMatch = '#4A707A80', // Selection match background with transparency
  activeBracketBg = '#39496650'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#1e3d2780', // Dark green with transparency for insertions
  removedBackground = '#4e282880'; // Dark red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  highlight: [
    { tag: t.null, color: base0B },
    { tag: t.heading2, color: base0C },
    { tag: t.heading3, color: base0D },
    { tag: t.heading4, color: base0E },
    { tag: t.heading5, color: base0F },
    { tag: t.heading6, color: base08 },
  ],
};

const theme = defineTheme({
  name: 'Material Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
    searchMatch: {
      background: '#394966cc',
      outline: base0D,
      foreground: base06,
      selectedBackground: base0D,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0D },
    nonMatchingBracket: { background: `${base08}40`, outline: base08 },
    panel: {
      background: base00,
      foreground: base05,
      border: base03,
      buttonBackground: base01,
      buttonForeground: base05,
      buttonHoverBackground: base02,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base01,
      activeBackground: '#252a2c',
      activeForeground: base05,
      foldHover: base05,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      selectedBackground: selection,
      selectedForeground: base06,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base10,
      deletedBackground: removedBackground,
      deletedForeground: base08,
    },
    diagnostic: { error: base08, warning: base0C, info: base0D },
    scrollbar: { track: base07, thumb: base02, thumbHover: base03 },
    merge: {
      backgroundColor: base07,
      borderColor: base03,
      buttonColor: base05,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base05 },
    punctuation: { color: base03 },
    name: { color: base0E },
    variable: { color: base11 },
    localVariable: { color: base0E },
    variableDefinition: { color: base0E },
    function: { color: base0D },
    self: { color: base09 },
    label: { color: base0D, fontStyle: 'italic' },
    property: { color: base0F, fontStyle: 'normal' },
    type: { color: base08 },
    typeDefinition: { color: base08, fontWeight: 'bold' },
    className: { color: base0B, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: base0B },
    string: { color: base0C },
    regexp: { color: base0A },
    number: { color: base0B },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base10 },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base12 },
    headingLevel: { color: base0B },
    list: { color: base12 },
    quote: { color: base03 },
    monospace: { color: base05 },
    contentSeparator: { color: base0E },
    link: {
      color: base0F,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0D, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0C },
    strong: { fontWeight: 'bold', color: base0E },
    strikethrough: { color: base08, textDecoration: 'line-through' },
    invalid: { color: base05, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base08}` },
    inserted: { color: base10 },
    deleted: { color: base08 },
    changed: { color: base0B },
  },
  migration,
});

/**
 * Combined Material Dark theme extension
 */
const materialDark: Extension = theme.extension;

/**
 * Material Dark merge revert styles configuration
 */
const materialDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, materialDark, materialDarkMergeStyles };
