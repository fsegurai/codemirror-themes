import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Palenight theme color definitions
 * ---------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#292D3E', // Background - deep indigo
  base01 = '#A6ACCD', // Foreground - lavender blue
  base02 = '#444267', // Selection background - muted indigo
  base03 = '#676E95', // Comments, invisible - steel blue
  base04 = '#BFC7D5', // Cursor - lighter lavender
  // Accent colors
  base05 = '#C3E88D', // Strings - light green
  base06 = '#82AAFF', // Keywords, Functions - sky blue
  base07 = '#C792EA', // Classes, Types - purple
  base08 = '#F78C6C', // Numbers, Constants - orange
  base09 = '#FFCB6B', // Classes, Attributes - yellow
  base0A = '#89DDFF', // Punctuation, Operators - light blue
  base0B = '#FF5370', // Tags, Errors - red
  base0C = '#BB80B3', // Special elements - mauve
  base0D = '#80CBC4'; // Properties - seafoam

// UI specific colors
const darkBackground = '#202331', // Darker background for panels and gutter
  highlightBackground = '#2e324817', // Active line background
  tooltipBackground = '#343A50', // Tooltip background
  selectionMatch = '#444267AA', // Selection match with opacity
  activeBracketBg = '#2E3248'; // Active bracket background

// Diff/merge specific colors
const addedBackground = '#2c3c2e80', // Dark green with transparency for insertions
  removedBackground = '#3e2e3180'; // Dark red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  highlight: [
    { tag: [t.bool, t.atom, t.special(t.variableName)], color: base0C },
    { tag: t.definition(t.name), color: base0A },
  ],
};

const theme = defineTheme({
  name: 'Palenight',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base04,
    selection: base02,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base06}40`,
    searchMatch: {
      background: `${base02}CC`,
      outline: base06,
      foreground: base01,
      selectedBackground: base06,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base03}50` },
    matchingBracket: { background: activeBracketBg, outline: base06 },
    nonMatchingBracket: { background: `${base0B}40`, outline: base0B },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: base02,
      buttonBackground: tooltipBackground,
      buttonForeground: base01,
      buttonHoverBackground: '#3A4058',
    },
    gutter: {
      background: darkBackground,
      foreground: base03,
      border: '#3A405880',
      activeBackground: '#2A2D40',
      activeForeground: base01,
      foldHover: base01,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: tooltipBackground,
      border: '#3A4058',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      selectedBackground: base02,
      selectedForeground: base04,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base05,
      deletedBackground: removedBackground,
      deletedForeground: base0B,
    },
    diagnostic: { error: base0B, warning: base09, info: base06 },
    scrollbar: { track: darkBackground, thumb: base02, thumbHover: '#515580' },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3A4058',
      buttonColor: base01,
      buttonHoverColor: '#3A4058',
    },
  },
  syntax: {
    keyword: { color: base06, fontWeight: 'bold' },
    definitionKeyword: { color: base06 },
    modifier: { color: base0C, fontStyle: 'italic' },
    operator: { color: base0A },
    punctuation: { color: base0A },
    name: { color: base01 },
    localVariable: { color: base08 },
    variableDefinition: { color: base08 },
    function: { color: base06 },
    self: { color: base07 },
    label: { color: base06 },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base07 },
    typeDefinition: { color: base07, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base09, fontStyle: 'italic' },
    tag: { color: base0B },
    attribute: { color: base09 },
    string: { color: base05 },
    number: { color: base08 },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base05 },
    annotation: { color: base0B, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base09 },
    headingLevel: { color: base09 },
    list: { color: base09 },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base09 },
    link: {
      color: base07,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base06, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base05 },
    strong: { fontWeight: 'bold', color: base09 },
    strikethrough: { color: base0B, textDecoration: 'line-through' },
    invalid: { color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0B}` },
    inserted: { color: base05 },
    deleted: { color: base0B },
    changed: { color: base08 },
  },
  migration,
});

/**
 * Combined Palenight theme extension
 */
const palenight: Extension = theme.extension;

/**
 * Palenight merge revert styles configuration
 */
const palenightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, palenight, palenightMergeStyles };
