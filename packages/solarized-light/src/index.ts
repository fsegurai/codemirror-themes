import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Solarized Light theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#657b83', // Body text/default text color
  base01 = '#586e75', // Optional emphasized content
  base02 = '#073642', // Background highlights
  base03 = '#002b36', // Comments, invisible, line highlighting
  base04 = '#dfd9c8', // Dark background tint
  base05 = '#93a1a1', // Default foreground/UI text color
  base06 = '#cceeff7a', // Light background tint (for selection)
  base07 = '#fdf6e3', // Background - light base
  base08 = '#eee8d5', // Background tint - light secondary
  // Accent colors from Solarized palette
  base09 = '#dc322f', // Red
  base0A = '#cb4b16', // Orange
  base0B = '#b58900', // Yellow
  base0C = '#859900', // Green
  base0D = '#2aa198', // Cyan
  base0E = '#268bd2', // Blue
  base0F = '#6c71c4', // Violet
  base10 = '#d33682'; // Magenta

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  tooltipBackground = '#f0e9d7', // Tooltip background
  selection = '#ffd07a', // Selection background
  selectionMatch = '#e1dbca90', // Selection match with opacity
  activeBracketBg = '#93a1a140'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#85990020', // Solarized green with transparency for insertions
  removedBackground = '#dc322f20'; // Solarized red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  highlight: [
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0B },
    { tag: t.separator, color: base0D },
    { tag: t.angleBracket, color: base01 },
    { tag: t.squareBracket, color: base09 },
    { tag: t.heading1, color: base03 },
  ],
};

const theme = defineTheme({
  name: 'Solarized Light',
  dark: false,
  ui: {
    background: base07,
    foreground: base00,
    cursor: base01,
    selection: selection,
    activeLine: base06,
    ghostText: base01,
    focusRing: `0 0 0 2px ${base07}, 0 0 0 3px ${base0E}40`,
    searchMatch: {
      background: `${base05}80`,
      outline: base0E,
      foreground: base01,
      selectedBackground: base0E,
      selectedForeground: base08,
    },
    selectionMatch: { background: selectionMatch, outline: `${base05}50` },
    matchingBracket: { background: activeBracketBg, outline: base0E },
    nonMatchingBracket: { background: `${base09}40`, outline: invalid },
    panel: {
      background: base04,
      foreground: base00,
      border: base04,
      buttonBackground: tooltipBackground,
      buttonForeground: base00,
      buttonHoverBackground: base06,
    },
    gutter: {
      background: base04,
      foreground: base01,
      border: base04,
      activeBackground: base06,
      activeForeground: base00,
      foldHover: base00,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: base03, border: `${base05}70` },
    tooltip: {
      background: tooltipBackground,
      border: base01,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: tooltipBackground,
      selectedBackground: selection,
      selectedForeground: base01,
      icon: base01,
      detail: base01,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0C,
      deletedBackground: removedBackground,
      deletedForeground: base09,
    },
    diagnostic: { error: base09, warning: base0B, info: base0E },
    scrollbar: { track: base04, thumb: base04, thumbHover: base05 },
    merge: {
      backgroundColor: base04,
      borderColor: base02,
      buttonColor: base0D,
      buttonHoverColor: activeBracketBg,
    },
  },
  syntax: {
    keyword: { color: base0C, fontWeight: 'bold' },
    definitionKeyword: { color: base0C },
    modifier: { color: base10, fontStyle: 'italic' },
    operator: { color: base0F },
    punctuation: { color: base01 },
    bracket: { color: base10 },
    name: { color: base0D },
    variable: { color: base00 },
    localVariable: { color: base0D },
    variableDefinition: { color: base0D },
    function: { color: base0E },
    self: { color: base10 },
    label: { color: base10 },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base0A },
    typeDefinition: { color: base0A, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base10, fontStyle: 'italic' },
    tag: { color: base0E },
    attribute: { color: base00 },
    string: { color: base0B },
    regexp: { color: invalid },
    number: { color: base10 },
    constant: { color: base10 },
    comment: { fontStyle: 'italic', color: base01 },
    meta: { color: base09 },
    processingInstruction: { color: base0C },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base02 },
    list: { color: base0B },
    quote: { color: base0C },
    monospace: { color: base00 },
    contentSeparator: { color: base0B },
    link: {
      color: base0D,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0C },
    strong: { fontWeight: 'bold', color: base02 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base09}`,
    },
    inserted: { color: base0C },
    deleted: { color: base09 },
    changed: { color: base10 },
  },
  migration,
});

/**
 * Combined Solarized Light theme extension
 */
const solarizedLight: Extension = theme.extension;

/**
 * Solarized Light merge revert styles configuration
 */
const solarizedLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, solarizedLight, solarizedLightMergeStyles };
