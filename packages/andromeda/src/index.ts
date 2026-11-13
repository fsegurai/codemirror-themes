import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Andromeda theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#1b1e26', // Background (slightly darker for better contrast)
  base01 = '#e4dff0', // Foreground (slightly brighter for better readability)
  base02 = '#db45a270', // Selection and Selection Match (reduced opacity)
  base03 = '#2b303b', // Dropdown Background
  base04 = '#ffffff', // Cursor (pure white for better visibility)
  base05 = '#d667ff', // Keyword, Storage (brighter purple)
  base06 = '#24e3c3', // Variable, Parameter (slightly desaturated teal)
  base07 = '#ffdd80', // Function, Type, Class (warmer yellow)
  base08 = '#a6e07a', // String, RegExp (slightly muted green for better readability)
  base09 = '#ff7057', // Constant, Number (brighter orange-red)
  base0A = '#a8aab9', // Comment (higher contrast gray)
  base0B = '#ff40b3', // Heading (slightly desaturated magenta)
  base0C = '#fd3681', // Tag (adjusted pink)
  base0D = '#c7c7ff', // New color for brackets/punctuation
  base0E = '#6ae4b9', // New color for special elements
  base0F = '#3c94ff', // New color for attributes and links
  invalid = '#ff3162', // Invalid (more visible red)
  // UI-specific colors
  darkBackground = '#242830',
  highlightBackground = '#30343d40',
  tooltipBackground = '#1f232d', // Darker tooltip for better contrast
  activeBracketBg = '#db45a230',
  // Diff/merge specific colors
  addedBackground = '#0f3a2440', // Dark green with transparency for insertions
  removedBackground = '#78112230', // Dark red with transparency for deletions
  removedText = '#ff5d7a'; // Bright red for removed text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { color: base04 },
    '.cm-panels': { borderRadius: null },
  },
  highlight: [{ tag: t.definition(t.function(t.variableName)), color: base06 }],
};

const theme = defineTheme({
  name: 'Andromeda',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base04,
    selection: base02,
    activeLine: highlightBackground,
    ghostText: base0A,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base05}40`,
    searchMatch: {
      background: activeBracketBg,
      outline: `${base05}30`,
      foreground: base01,
      selectedBackground: '#db45a280',
      selectedForeground: base01,
    },
    selectionMatch: { background: '#db45a240', outline: `${base05}50` },
    matchingBracket: { background: activeBracketBg, outline: `${base05}50` },
    nonMatchingBracket: { background: '#ff405030', outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base06,
      border: '#3a3e4c',
      buttonBackground: darkBackground,
      buttonForeground: base06,
      buttonHoverBackground: '#343946',
    },
    gutter: {
      background: darkBackground,
      foreground: '#748099',
      border: '#33384550',
      activeBackground: highlightBackground,
      activeForeground: base01,
      foldHover: base01,
    },
    foldPlaceholder: { background: 'transparent', foreground: base02, border: `${base05}70` },
    tooltip: {
      background: tooltipBackground,
      border: '#3a3e4c',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base03,
      selectedBackground: '#db45a240',
      selectedForeground: base01,
      icon: '#748099',
      detail: '#748099',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base08,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
    },
    diagnostic: { error: invalid, warning: base07, info: base0F },
    scrollbar: { track: darkBackground, thumb: '#3b4151', thumbHover: '#4e5568' },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3a3e4c',
      buttonColor: base06,
      buttonHoverColor: '#343946',
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base0F, fontStyle: 'italic' },
    operator: { color: base0D },
    punctuation: { color: base0D },
    name: { color: base06 },
    function: { color: base07 },
    self: { color: base09 },
    label: { color: base07 },
    property: { color: base06, fontStyle: 'normal' },
    type: { color: base07 },
    typeDefinition: { color: base07, fontWeight: 'bold' },
    className: { color: base07, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base0C },
    attribute: { color: base0F },
    string: { color: base08 },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base0A },
    meta: { color: base0A },
    processingInstruction: { color: base08 },
    annotation: { color: base0F, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base0B },
    list: { color: base0B },
    monospace: { color: base0B },
    contentSeparator: { color: base0B },
    link: {
      color: base0F,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0E, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0E },
    strong: { fontWeight: 'bold', color: base09 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base08 },
    deleted: { color: invalid },
    changed: { color: base09 },
  },
  migration,
});

/**
 * Combined Andromeda theme extension
 */
const andromeda: Extension = theme.extension;

/**
 * Andromeda merge revert styles configuration
 */
const andromedaMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { andromeda, andromedaMergeStyles, applyMergeRevertStyles };
