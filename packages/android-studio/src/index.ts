import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Android Studio theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#282b2e', // Background (authentic IntelliJ IDEA dark theme)
  base01 = '#a9b7c6', // Foreground (standard text)
  base02 = '#3f3f3f', // Selection background (slightly darker for contrast)
  base03 = '#3b3b3b', // Gutter background (slightly lighter than the main background)
  base04 = '#606366', // Line numbers (slightly darker for less distraction)
  // Language syntax colors
  base05 = '#cc7832', // Keywords (signature orange)
  base06 = '#6897bb', // Numbers, constants (signature blue)
  base07 = '#9876aa', // Variables (improved purple)
  base08 = '#787878', // Comments (authentic gray)
  base09 = '#bbb529', // Meta, annotations (yellow-green)
  base0A = '#6a8759', // Strings (signature green)
  base0B = '#ffc66d', // Class names, types (warmer gold)
  base0D = '#629755', // Function names, docs (forest green)
  base0E = '#d0d0ff', // Brackets, special constructs (soft purple)
  base0F = '#e8bf6a', // Tags (amber)
  base10 = '#3c7abb', // Links (blue)
  base11 = '#50a658', // URLs (green)
  // UI-specific colors
  invalid = '#ff5353', // Error highlighting (more visible)
  cursor = '#ffffff', // Cursor color
  selectionBackground = '#2e5280', // Stronger selection background
  highlightBackground = '#323232', // Active line highlight
  gutterBackground = '#313335', // Gutter background
  activeBracketBg = '#3b514d',
  activeBracketBorder = '#43705c',
  // Diff/merge specific colors
  addedBackground = '#294436', // Dark green for insertions, matching IntelliJ
  removedBackground = '#484a4a'; // Dark gray/red for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-selectionLayer': { zIndex: null },
    '.cm-searchMatch': { color: null },
    '.cm-panels': { borderRadius: null },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid #5b5b5b' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid #5b5b5b' },
    '.cm-activeLine': { zIndex: null },
    '.cm-tooltip-autocomplete > ul': { backgroundColor: null, border: null },
  },
  highlight: [
    { tag: [t.bool, t.atom, t.special(t.variableName)], color: base05 },
    { tag: t.brace, color: base01 },
    { tag: t.definition(t.function(t.variableName)), color: base07 },
  ],
};

const theme = defineTheme({
  name: 'Android Studio',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: cursor,
    selection: selectionBackground,
    activeLine: `${highlightBackground}21`,
    ghostText: '#a9a9a9',
    focusRing: `0 0 0 2px ${base02}, 0 0 0 4px ${base00}`,
    searchMatch: {
      background: '#32593d',
      outline: cursor,
      foreground: cursor,
      selectedBackground: '#375580',
      selectedForeground: cursor,
    },
    selectionMatch: { background: '#32593d40', outline: base0D },
    matchingBracket: { background: activeBracketBg, outline: activeBracketBorder },
    nonMatchingBracket: { background: '#53383e', outline: invalid },
    panel: {
      background: gutterBackground,
      foreground: base01,
      border: '#5b5b5b',
      buttonBackground: gutterBackground,
      buttonForeground: base01,
      buttonHoverBackground: '#404040',
    },
    gutter: {
      background: gutterBackground,
      foreground: base04,
      border: base02,
      activeBackground: highlightBackground,
      activeForeground: '#c0c0c0',
      foldHover: base01,
    },
    foldPlaceholder: { background: base03, foreground: '#a1a1a1', border: base04 },
    tooltip: {
      background: base03,
      border: '#5b5b5b',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      selectedBackground: selectionBackground,
      selectedForeground: cursor,
      icon: base04,
      detail: base04,
      listBackground: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      deletedBackground: removedBackground,
      deletedForeground: base05,
    },
    diagnostic: { error: invalid, warning: base0F, info: base0D },
    scrollbar: { track: gutterBackground, thumb: '#5a5a5a', thumbHover: '#6e6e6e' },
    merge: {
      backgroundColor: gutterBackground,
      borderColor: '#5b5b5b',
      buttonColor: base01,
      buttonHoverColor: '#414141',
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base05 },
    punctuation: { color: base01 },
    bracket: { color: base0E },
    name: { color: base07 },
    function: { color: base01 },
    self: { color: base05 },
    label: { color: base0D },
    property: { color: base0A, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0B, fontStyle: 'italic' },
    namespace: { color: base07, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: base01 },
    string: { color: base0A },
    number: { color: base06 },
    constant: { color: base06 },
    comment: { fontStyle: 'italic', color: base08 },
    docComment: { fontStyle: 'italic', color: base0D },
    meta: { color: base08 },
    processingInstruction: { color: base0A },
    annotation: { color: base09, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base0B },
    list: { color: base0B },
    monospace: { color: base0B },
    contentSeparator: { color: base0B },
    link: { color: base10, fontWeight: '500' },
    url: { color: base11, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base0A },
    deleted: { color: invalid },
    changed: { color: base06 },
  },
  migration,
});

/**
 * Combined Android Studio theme extension
 */
const androidStudio: Extension = theme.extension;

/**
 * Android Studio merge revert styles configuration
 */
const androidStudioMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { androidStudio, androidStudioMergeStyles, applyMergeRevertStyles };
