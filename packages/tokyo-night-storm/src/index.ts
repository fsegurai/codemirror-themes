import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Tokyo Night Storm theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#24283b', // Background
  // const base01 = '#7982a9'; // Foreground
  base02 = '#414868', // Selection background
  base03 = '#565f89', // Comments, invisible
  base04 = '#c0caf5', // Default foreground (bright blue)
  base05 = '#282e44', // Dark background for panels
  base06 = '#1f2335', // Darker background (gutter)
  // Accent colors
  base07 = '#f7768e', // Errors, invalid
  base08 = '#ff9e64', // Numbers, constants
  base09 = '#e0af68', // Classes, attributes
  base0A = '#9ece6a', // Strings, success
  base0B = '#2ac3de', // Types, parameter
  base0C = '#7aa2f7', // Functions, properties
  base0D = '#bb9af7'; // Keywords, operators

// UI specific colors
const highlightBackground = '#292e427a', // Line highlight with transparency
  selection = '#6f7bb630', // Selection background with transparency
  selectionMatch = '#6f7bb650', // Selection match with transparency
  activeBracketBg = '#3d59a150'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80'; // Dark red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-searchMatch span': { color: null },
  },
  highlight: [
    { tag: [t.color, t.standard(t.name)], color: base0D },
    { tag: t.separator, color: base04 },
    { tag: t.heading1, color: '#89ddff', fontWeight: 'bold' },
  ],
};

const theme = defineTheme({
  name: 'Tokyo Night Storm',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0C}40`,
    searchMatch: {
      background: `${base0C}40`,
      outline: base0C,
      foreground: base04,
      selectedBackground: base0C,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0C },
    nonMatchingBracket: { background: `${base07}20`, outline: base07 },
    panel: {
      background: base05,
      foreground: base04,
      border: base03,
      buttonBackground: base05,
      buttonForeground: base04,
      buttonHoverBackground: base06,
    },
    gutter: {
      background: base06,
      foreground: base03,
      border: base06,
      activeBackground: base06,
      activeForeground: base04,
      foldHover: base04,
    },
    foldPlaceholder: { background: base05, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base05,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base05,
      selectedBackground: selection,
      selectedForeground: base04,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      deletedBackground: removedBackground,
      deletedForeground: base07,
    },
    diagnostic: { error: base07, warning: base08, info: base0B },
    scrollbar: { track: base06, thumb: base02, thumbHover: base03 },
    merge: {
      backgroundColor: base05,
      borderColor: base03,
      buttonColor: base04,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base0D, fontWeight: 'bold' },
    definitionKeyword: { color: base0D },
    modifier: { color: base08, fontStyle: 'italic' },
    operator: { color: base0D },
    punctuation: { color: base03 },
    name: { color: base04 },
    function: { color: base0C },
    self: { color: base08 },
    label: { color: base0C, fontStyle: 'italic' },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base0C, fontStyle: 'italic' },
    tag: { color: base0D },
    attribute: { color: base09 },
    string: { color: base0A },
    regexp: { color: '#b4f9f8' },
    number: { color: base08 },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base0A },
    annotation: { color: base07, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: '#89ddff' },
    headingLevel: { color: '#89ddff' },
    list: { color: '#89ddff' },
    quote: { color: base03 },
    monospace: { color: base04 },
    contentSeparator: { color: base0C },
    link: {
      color: base0D,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base04 },
    strikethrough: { color: base07, textDecoration: 'line-through' },
    invalid: { color: base04, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base07}` },
    inserted: { color: base0A },
    deleted: { color: base07 },
    changed: { color: base08 },
  },
  migration,
});

/**
 * Combined Tokyo Night Storm theme extension
 */
const tokyoNightStorm: Extension = theme.extension;

/**
 * Tokyo Night Storm merge revert styles configuration
 */
const tokyoNightStormMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, tokyoNightStorm, tokyoNightStormMergeStyles };
