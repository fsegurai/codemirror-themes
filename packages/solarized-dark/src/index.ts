import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Solarized Dark theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#002b36', // Background - dark blue
  base01 = '#073642', // Lighter background (popups, statuslines)
  base02 = '#586e75', // Selection background
  base03 = '#657b83', // Comments, invisibles
  base04 = '#839496', // Body text
  base05 = '#93a1a1', // Default foreground
  base06 = '#eee8d5', // Light foreground
  base07 = '#fdf6e3', // Light background
  // Accent colors from Solarized palette
  base08 = '#dc322f', // Red
  base09 = '#cb4b16', // Orange
  base0A = '#b58900', // Yellow
  base0B = '#859900', // Green
  base0C = '#2aa198', // Cyan
  base0D = '#268bd2', // Blue
  base0E = '#6c71c4', // Violet
  base0F = '#d33682'; // Magenta

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  darkBackground = '#00252f', // Darker background for panels
  highlightBackground = '#99eeff0f', // Active line highlight
  selection = '#02B8FF3F', // Selection background with opacity
  selectionMatch = '#586e7580', // Selection match with opacity
  activeBracketBg = '#586e7540'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#2aa19820', // Solarized cyan with transparency for insertions
  removedBackground = '#dc322f20'; // Solarized red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-panels': { color: base04 },
  },
  highlight: [
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0A },
    { tag: t.separator, color: base0C },
    { tag: t.angleBracket, color: base02 },
    { tag: t.squareBracket, color: base08 },
    { tag: t.heading1, color: base07 },
  ],
};

const theme = defineTheme({
  name: 'Solarized Dark',
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
      background: `${base02}99`,
      outline: base0D,
      foreground: base06,
      selectedBackground: base0D,
      selectedForeground: base07,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0D },
    nonMatchingBracket: { background: `${base08}40`, outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base05,
      border: base01,
      buttonBackground: base01,
      buttonForeground: base05,
      buttonHoverBackground: highlightBackground,
    },
    gutter: {
      background: darkBackground,
      foreground: base02,
      border: base01,
      activeBackground: base01,
      activeForeground: base05,
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base02}70` },
    tooltip: {
      background: base01,
      border: base02,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      selectedBackground: selection,
      selectedForeground: base06,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0B,
      deletedBackground: removedBackground,
      deletedForeground: base08,
    },
    diagnostic: { error: base08, warning: base0A, info: base0D },
    scrollbar: { track: darkBackground, thumb: base01, thumbHover: base02 },
    merge: {
      backgroundColor: darkBackground,
      borderColor: base02,
      buttonColor: base05,
      buttonHoverColor: base01,
    },
  },
  syntax: {
    keyword: { color: base0B, fontWeight: 'bold' },
    definitionKeyword: { color: base0B },
    modifier: { color: base0F, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base04 },
    bracket: { color: base0F },
    name: { color: base0C },
    variable: { color: base05 },
    localVariable: { color: base0C },
    variableDefinition: { color: base0C },
    function: { color: base0D },
    self: { color: base0F },
    label: { color: base0F },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base09 },
    typeDefinition: { color: base09, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base0F, fontStyle: 'italic' },
    tag: { color: base0D },
    attribute: { color: base05 },
    string: { color: base0A },
    regexp: { color: invalid },
    number: { color: base0F },
    constant: { color: base0F },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base08 },
    processingInstruction: { color: base0B },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0A },
    headingLevel: { color: base06 },
    list: { color: base0A },
    quote: { color: base0B },
    monospace: { color: base05 },
    contentSeparator: { color: base0A },
    link: {
      color: base0C,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0A, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base06 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base02,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base08}`,
    },
    inserted: { color: base0B },
    deleted: { color: base08 },
    changed: { color: base0F },
  },
  migration,
});

/**
 * Combined Solarized Dark theme extension
 */
const solarizedDark: Extension = theme.extension;

/**
 * Solarized Dark merge revert styles configuration
 */
const solarizedDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, solarizedDark, solarizedDarkMergeStyles };
