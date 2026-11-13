import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Material Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff', // Background - pure white for clean look
  base01 = '#f5f5f5', // Lighter background (popups, statuslines)
  base02 = '#212121', // Main text - nearly black for contrast
  base03 = '#757575', // Comments, invisibles - gray 600
  base04 = '#9e9e9e', // Cursor and line numbers - gray 500
  base05 = '#424242', // Default foreground - gray 800
  base06 = '#eeeeee', // Light borders or divisions - gray 200
  base07 = '#fafafa', // Light background (gutter) - gray 50
  // Accent colors - using standard Material Design palette
  base08 = '#f44336', // Red 500
  base09 = '#ff3e00', // Deep Orange 500
  base0A = '#FF00E9FF', // Pink 500
  base0B = '#ffc107', // Amber 500 (better than yellow for light theme)
  base0C = '#ff9800', // Orange 500
  base0D = '#00acc1', // Cyan 600 (better contrast for light theme)
  base0E = '#3949ab', // Indigo 600 (better contrast for light theme)
  base0F = '#8e24aa', // Purple 600 (better contrast for light theme)
  base10 = '#43a047', // Green 600 (better contrast for light theme)
  base11 = '#00897b', // Teal 600 (better contrast for light theme)
  base12 = '#1e88e5'; // Blue 600 (better contrast for light theme)

// UI specific colors
const highlightBackground = '#00000008', // Line highlight
  selection = '#DDEEFF', // Selection background
  selectionMatch = '#90a4ae26', // Selection match background
  activeBracketBg = '#DDEEFF80', // Active bracket background
  hoverHighlight = '#ECEFF180'; // Hover highlight

// Diff/merge specific colors
const addedBackground = '#e6ffed80', // Light green with transparency for insertions
  removedBackground = '#ffebe980', // Light red with transparency for deletions
  addedText = '#28a745', // Bright green for added text
  removedText = '#d73a49'; // Bright red for removed text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-fat-cursor': { backgroundColor: `${base02}99` },
    '.cm-panels': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' },
    '.cm-foldGutter .cm-gutterElement': { transition: 'color 0.15s ease' },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': { border: `1px solid ${addedText}30` },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': { border: `1px solid ${removedText}30` },
    '.cm-tooltip-autocomplete > ul > li:hover': { backgroundColor: hoverHighlight },
  },
  highlight: [
    { tag: [t.bool, t.atom, t.heading5], color: base0F },
    { tag: t.separator, color: base0A },
    { tag: t.constant(t.name), color: base09 },
    { tag: t.angleBracket, color: base02 },
    { tag: t.squareBracket, color: base08 },
    { tag: t.heading2, color: base0C },
    { tag: t.heading3, color: base0D },
    { tag: t.heading4, color: base0E },
    { tag: t.heading6, color: base10 },
    { tag: t.special(t.variableName), color: base05 },
  ],
};

const theme = defineTheme({
  name: 'Material Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base02,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
    searchMatch: {
      background: '#FFA72680',
      outline: base0B,
      foreground: base02,
      selectedBackground: base0D,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base03}30` },
    matchingBracket: { background: activeBracketBg, outline: base0D },
    nonMatchingBracket: { background: `${base08}20`, outline: base08 },
    panel: {
      background: base06,
      foreground: base02,
      border: base04,
      buttonBackground: base01,
      buttonForeground: base02,
      buttonHoverBackground: '#CFD8DC',
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base04,
      activeBackground: '#E0E0E0',
      activeForeground: base02,
      foldHover: base02,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      border: base04,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base01,
      selectedBackground: hoverHighlight,
      selectedForeground: base02,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
    },
    diagnostic: { error: base08, warning: base0C, info: base0D },
    scrollbar: { track: base07, thumb: base03, thumbHover: base02 },
    merge: {
      backgroundColor: base01,
      borderColor: base04,
      buttonColor: base02,
      buttonHoverColor: '#CFD8DC',
    },
  },
  syntax: {
    keyword: { color: base0D, fontWeight: 'bold' },
    definitionKeyword: { color: base0D },
    modifier: { color: base0C, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base03 },
    bracket: { color: base0F },
    name: { color: base05 },
    localVariable: { color: base0A },
    variableDefinition: { color: base0A },
    function: { color: base09 },
    self: { color: base0C },
    label: { color: base12, fontStyle: 'italic' },
    property: { color: base11, fontStyle: 'normal' },
    type: { color: base0C },
    typeDefinition: { color: base0A, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base09 },
    attribute: { color: base05 },
    string: { color: base10 },
    regexp: { color: base0A },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base10 },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base11 },
    headingLevel: { color: base12 },
    list: { color: base11 },
    monospace: { color: base02 },
    contentSeparator: { color: base0D },
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
    invalid: {
      color: base02,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base08}`,
    },
    inserted: { color: base10 },
    deleted: { color: base08 },
    changed: { color: base0C },
  },
  migration,
});

/**
 * Combined Material Light theme extension
 */
const materialLight: Extension = theme.extension;

/**
 * Material Light merge revert styles configuration
 */
const materialLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, materialLight, materialLightMergeStyles };
