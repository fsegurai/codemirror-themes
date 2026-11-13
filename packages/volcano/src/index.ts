import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Volcano theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#390000', // Background
  base01 = '#F8F8F8', // Foreground
  base02 = '#750000', // Selection background
  base03 = '#e7c0c0', // Comments, invisibles
  base04 = '#970000', // Cursor
  base05 = '#f12727', // Default foreground
  base06 = '#580000', // Dark background for panels
  base07 = '#4a0000', // Darker background (gutter)
  // Accent colors
  base08 = '#ec0d1e', // Errors, invalid
  base09 = '#aa5507', // Numbers, constants
  base0A = '#fec758', // Classes, attributes
  base0B = '#9df39f', // Success
  base0C = '#7df3f7', // Functions, parameters
  base0D = '#7dcaf7', // Variables
  base0E = '#c27df7', // Keywords, operators
  base0F = '#f77dca'; // Special characters

// UI specific colors
const invalid = '#ffffff',
  highlightBackground = '#ff000035', // Line highlight with transparency
  tooltipBackground = '#680000',
  selection = '#75000080', // Selection background with transparency
  selectionMatch = '#7500009a', // Selection match with transparency
  activeBracketBg = '#ff550040'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#2a4a0080', // Dark green with transparency for insertions
  removedBackground = '#750000a0'; // Dark red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-searchMatch span': { color: null },
    '.cm-searchMatch.cm-searchMatch-selected span': { color: base01 },
    '.cm-panels.cm-panels-top': { borderBottom: `2px solid ${base00}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `2px solid ${base00}` },
    '.cm-panel button:hover': { boxShadow: '0 0 4px #ff550080' },
    '.cm-tooltip-autocomplete > ul': { maxHeight: '300px' },
  },
  highlight: [
    { tag: [t.separator, t.definition(t.name)], color: base01 },
    { tag: t.heading2, color: base09 },
    { tag: t.heading3, color: base0A },
    { tag: t.heading4, color: base0B },
    { tag: t.heading5, color: base0C },
    { tag: t.heading6, color: base0D },
  ],
};

const theme = defineTheme({
  name: 'Volcano',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base08}70`,
    searchMatch: {
      background: selection,
      outline: base08,
      foreground: base01,
      selectedBackground: base08,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base08 },
    nonMatchingBracket: { background: `${base08}40`, outline: invalid },
    panel: {
      background: base06,
      foreground: base01,
      border: base00,
      buttonBackground: base07,
      buttonForeground: base01,
      buttonHoverBackground: base02,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base06,
      activeBackground: '#550000',
      activeForeground: base01,
      foldHover: base01,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: tooltipBackground,
      border: `${base08}60`,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      selectedBackground: base02,
      selectedForeground: base01,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0B,
      deletedBackground: removedBackground,
      deletedForeground: base08,
    },
    diagnostic: { error: base08, warning: base09, info: base0C },
    scrollbar: { track: base07, thumb: base02, thumbHover: base08 },
    merge: {
      backgroundColor: tooltipBackground,
      borderColor: base07,
      buttonColor: base01,
      buttonHoverColor: base08,
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base03 },
    name: { color: base01 },
    variable: { color: base0A },
    function: { color: base0C },
    self: { color: base09 },
    label: { color: base0C, fontStyle: 'italic' },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base0D, fontStyle: 'italic' },
    tag: { color: base08 },
    attribute: { color: base0A },
    string: { color: base0A },
    regexp: { color: base0F },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base0B },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base09 },
    headingLevel: { color: base08, fontWeight: 'bold' },
    list: { color: base09 },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base0D },
    link: {
      color: base0E,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0C, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0A },
    strong: { fontWeight: 'bold', color: base01 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base0B },
    deleted: { color: base08 },
    changed: { color: base09 },
  },
  migration,
});

/**
 * Combined Volcano theme extension
 */
const volcano: Extension = theme.extension;

/**
 * Volcano merge revert styles configuration
 */
const volcanoMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, volcano, volcanoMergeStyles };
