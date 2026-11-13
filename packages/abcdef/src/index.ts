import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

// Enhanced Abcdef theme colors with improved contrast and harmony
const base00 = '#0a0e14', // Background (slightly deeper for better contrast)
  base01 = '#e0edff', // Foreground (slightly bluer tint for better readability)
  base02 = '#3a4a5f', // Selection (richer blue tone)
  base03 = '#242936', // Gutter background (distinguished from selection)
  base04 = '#d8e1f0', // Gutter foreground (softer white)
  base05 = '#4fc1ff', // Caret (bright cyan blue for visibility)
  base06 = '#3a4a5f40', // Line highlight with balanced opacity
  base07 = '#1a2030', // Dark background for panels
  base08 = '#efbb24', // Keyword (warm gold instead of darkgoldenrod)
  base09 = '#7799ff', // Atom (brighter blue)
  base0A = '#8c8f93', // Comment (slightly bluer gray)
  base0B = '#c792ea', // Number (softer purple)
  base0C = '#ffee99', // Definition, Function (softer yellow)
  base0D = '#abcdef', // Variable (keeping the theme's signature color)
  base0E = '#ffcc44', // Type Name (warmer yellow)
  base0F = '#99c2ff', // Tag Name (light blue)
  // UI elements
  invalid = '#ff5370', // Invalid color (more visible red)
  tooltipBackground = '#0f1521', // Darker tooltip for better contrast
  selectionForeground = '#ffffff', // Selection text color
  activeBracketBg = '#3a4a5f60', // Active bracket background
  // Diff/merge specific colors
  addedBackground = '#1d391d4d', // Dark green for insertions
  removedBackground = '#391d1d08', // Dark red for deletions
  addedText = '#7aecb3', // Bright mint green for added text
  removedText = '#ff8a80'; // Soft red for removed text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-selectionLayer': { zIndex: null },
    '.cm-searchMatch': { color: null },
    '.cm-searchMatch.cm-searchMatch-selected': { color: null, outline: `3px solid ${base0F}` },
    '.cm-panels': { borderRadius: null },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid #1c2838' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid #1c2838' },
    '.cm-activeLine': { zIndex: null },
    '.cm-gutters': { borderRight: null },
    '.cm-tooltip-autocomplete > ul': { backgroundColor: null, border: null },
    '.cm-foldPlaceholder': { fontStyle: 'italic' },
  },
  highlight: [{ tag: t.definition(t.name), color: base09 }],
};

const theme = defineTheme({
  name: 'Abcdef',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base05,
    selection: base02,
    activeLine: base06,
    ghostText: base04,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
    searchMatch: {
      background: `${base0F}40`,
      outline: base0F,
      foreground: selectionForeground,
      selectedBackground: '#38465b63',
      selectedForeground: selectionForeground,
    },
    selectionMatch: { background: base06, outline: base0D },
    matchingBracket: { background: activeBracketBg, outline: base0D },
    nonMatchingBracket: { background: base06, outline: base0D },
    panel: {
      background: base07,
      foreground: base04,
      border: '#1c2838',
      buttonBackground: base02,
      buttonForeground: base01,
      buttonHoverBackground: '#4a5a6f',
    },
    gutter: {
      background: base03,
      foreground: base04,
      activeBackground: base06,
      activeForeground: selectionForeground,
      foldHover: base0D,
      border: base03,
    },
    foldPlaceholder: { background: base06, foreground: base0D, border: base0D },
    tooltip: {
      background: tooltipBackground,
      border: base02,
      shadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      selectedBackground: base02,
      selectedForeground: base01,
      icon: base0D,
      detail: base0A,
      listBackground: tooltipBackground,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
    },
    diagnostic: { error: invalid, warning: base08, info: base05 },
    scrollbar: { track: base07, thumb: `${base02}AA`, thumbHover: base02 },
    merge: {
      backgroundColor: base03,
      borderColor: base02,
      buttonColor: selectionForeground,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: '#ffad5c', fontStyle: 'italic' },
    operator: { color: '#ff9cac' },
    punctuation: { color: '#d0d6e0' },
    name: { color: base09 },
    localVariable: { color: base0C },
    variableDefinition: { color: base0C },
    function: { color: base0C },
    self: { color: base0B },
    label: { color: '#ffad5c' },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base0E },
    typeDefinition: { color: base0E, fontWeight: 'bold' },
    className: { color: base0D, fontStyle: 'italic' },
    namespace: { color: '#78a0d3', opacity: 0.8 },
    tag: { color: base0F },
    attribute: { color: '#ffad5c' },
    string: { color: addedText },
    regexp: { color: '#6acdbe' },
    number: { color: base0B },
    constant: { color: base0B },
    comment: { fontStyle: 'italic', color: base0A },
    meta: { color: '#78a0d3' },
    processingInstruction: { color: addedText },
    annotation: { color: '#ffad5c', fontStyle: 'italic' },
    heading: { color: base0E, fontWeight: 'bold' },
    headingLevel: { color: base0E },
    list: { color: base0E },
    monospace: { color: base0E },
    contentSeparator: { color: base0E },
    link: { color: base0E, fontWeight: '500' },
    url: { color: '#66c2ff', textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: addedText },
    deleted: { color: invalid },
    changed: { color: '#ff9cac' },
  },
  migration,
});

/**
 * Combined Abcdef theme extension
 */
const abcdef: Extension = theme.extension;

/**
 * Abcdef merge revert styles configuration
 */
const abcdefMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { abcdef, abcdefMergeStyles, applyMergeRevertStyles };
