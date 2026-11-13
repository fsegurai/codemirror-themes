import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced color palette for Basic Light theme
 * ----------------------------------------
 * Colors are organized by function with visual color blocks for quick reference
 */

// Text colors (dark shades)
const base00 = '#1c2434', //  deep navy - primary text (darker for better contrast)
  base01 = '#2d3748', //  dark slate - secondary text, cursor
  base02 = '#4a5568', //  medium slate - gutter text
  base03 = '#718096', //  steel blue - comments, panel text
  // Background shades
  base04 = '#edf2f750', // very light blue w/transparency - active line gutter
  base05 = '#f7fafc', // off-white - tooltip background
  base06 = '#f0f4f8', // snow-white - gutter background
  // Primary accent colors (cool tones)
  base07 = '#0c7792', //  teal - links, braces (more saturated)
  base08 = '#0369a1', //  azure blue - numbers, constants (deeper)
  base09 = '#2b6cb0', //  royal blue - variables, parameters
  base0A = '#1a365d', //  deep navy - keywords, headings
  // Secondary accent colors (warm and complementary)
  base0B = '#c53030', //  red - square brackets (more vibrant)
  base0C = '#dd6b20', //  orange - strings (warmer, more vibrant)
  base0D = '#d69e2e', //  amber - class names (more saturated)
  base0E = '#2f855a', //  green - operators (deeper, richer)
  base0F = '#805ad5'; //  purple - tag names (more vibrant)

// UI-specific colors
const invalid = '#e53e3e', //  bright red - errors (more visible)
  highlightBackground = '#ebf4ff40', // active line highlight (subtle blue)
  background = '#ffffff', // editor background
  selection = '#90cdf480', // selection background (clearer blue)
  selectionMatch = '#63b3ed40', // selection match highlight
  activeBracketBg = '#0c779220'; // active bracket background (transparent teal)

// Diff/merge specific colors
const addedBackground = '#e6ffec60', // Light green with transparency for insertions
  removedBackground = '#ffebe9a0', // Light red with transparency for deletions
  addedText = '#24783b', // Dark green for added text
  removedText = '#cf222e'; // Dark red for removed text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { color: base0A },
    '.cm-panels': { color: base03 },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': { border: `1px solid ${addedText}30` },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': { border: `1px solid ${removedText}30` },
  },
  highlight: [
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0A },
    { tag: [t.null, t.heading5, t.heading6], color: base08 },
    { tag: t.angleBracket, color: base0C },
    { tag: t.squareBracket, color: base0B },
    { tag: t.definition(t.function(t.variableName)), color: base09 },
  ],
};

const theme = defineTheme({
  name: 'Basic Light',
  dark: false,
  ui: {
    background: background,
    foreground: base00,
    cursor: base01,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${background}, 0 0 0 3px ${base09}30`,
    searchMatch: {
      background: selectionMatch,
      outline: base09,
      foreground: base00,
      selectedBackground: '#63b3ed70',
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base09}30` },
    matchingBracket: { background: activeBracketBg, outline: base09 },
    nonMatchingBracket: { background: `${invalid}20`, outline: invalid },
    panel: {
      background: base06,
      foreground: base02,
      border: '#e2e8f0',
      buttonBackground: base06,
      buttonForeground: base02,
      buttonHoverBackground: '#e2e8f0',
    },
    gutter: {
      background: base06,
      foreground: base02,
      border: '#e2e8f0',
      activeBackground: base04,
      activeForeground: base00,
      foldHover: base00,
    },
    foldPlaceholder: { background: 'transparent', foreground: base03, border: `${base09}50` },
    tooltip: {
      background: base05,
      border: '#e2e8f0',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      listBackground: base05,
      selectedBackground: activeBracketBg,
      selectedForeground: base00,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
    },
    diagnostic: { error: invalid, warning: base0D, info: base07 },
    scrollbar: { track: base06, thumb: '#cbd5e0', thumbHover: '#a0aec0' },
    merge: {
      backgroundColor: base06,
      borderColor: '#e2e8f0',
      buttonColor: base02,
      buttonHoverColor: '#e2e8f0',
    },
  },
  syntax: {
    keyword: { color: base0A, fontWeight: 'bold' },
    definitionKeyword: { color: base0A },
    modifier: { color: base08, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base07 },
    name: { color: base09 },
    function: { color: base08 },
    self: { color: base08 },
    label: { color: base08 },
    property: { color: base09, fontStyle: 'normal' },
    type: { color: base0D },
    typeDefinition: { color: base0D, fontWeight: 'bold' },
    className: { color: base0D, fontStyle: 'italic' },
    namespace: { color: base09, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: base0D },
    string: { color: base0C },
    regexp: { color: base0B },
    number: { color: base08 },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base08 },
    processingInstruction: { color: base07 },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    list: { color: base08 },
    quote: { color: base01 },
    monospace: { color: base00 },
    contentSeparator: { color: base0D },
    link: {
      color: base07,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0C, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0A },
    strong: { fontWeight: 'bold', color: base09 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base00,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base07 },
    deleted: { color: invalid },
    changed: { color: base08 },
  },
  migration,
});

/**
 * Combined Basic Light theme extension
 */
const basicLight: Extension = theme.extension;

/**
 * Basic Light merge revert styles configuration
 */
const basicLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, basicLight, basicLightMergeStyles };
