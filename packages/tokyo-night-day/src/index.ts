import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Tokyo Night Day theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#e1e2e7', // Background
  base01 = '#3760bf', // Primary foreground
  base02 = '#99a7df', // Selection background
  base03 = '#848cb5', // Comments, invisibles
  base04 = '#8c91a8', // Dark foreground (status)
  base06 = '#e9e9ec', // Light background
  base07 = '#d5d6db', // Light background (gutter)
  // Accent colors
  base_red = '#f52a65', // Errors, invalid
  base_orange = '#b15c00', // Numbers, constants
  base_yellow = '#8c6c3e', // Classes, attributes
  base_green = '#587539', // Strings, success
  base_cyan = '#007197', // Functions, keywords
  base_blue = '#2e7de9', // Variables, parameters
  base_purple = '#7847bd', // Operators, tags
  base_magenta = '#9854f1'; // Special characters

// UI specific colors
const highlightBackground = '#5F5FAF5A', // Line highlight with improved transparency
  selection = '#99a7df40', // Selection background with transparency
  selectionMatch = '#99a7df60', // Selection match with transparency
  activeBracketBg = '#0e639c20'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#58753920', // Green with transparency for insertions
  removedBackground = '#f52a6520'; // Red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-searchMatch span': { color: null },
    '.cm-panels': { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' },
    '.cm-panel button:hover': { border: `1px solid ${base02}` },
    '.cm-activeLineGutter': { backgroundColor: null },
    '.cm-tooltip-autocomplete > ul': { maxHeight: '300px' },
  },
  highlight: [
    { tag: t.separator, color: base_blue },
    { tag: t.heading1, color: base_orange, fontWeight: 'bold' },
    { tag: [t.heading2, t.heading3], color: base_orange },
  ],
};

const theme = defineTheme({
  name: 'Tokyo Night Day',
  dark: false,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base01,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base_cyan}40`,
    searchMatch: {
      background: '#0e639c40',
      outline: base_cyan,
      foreground: base01,
      selectedBackground: base_cyan,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base_cyan },
    nonMatchingBracket: { background: removedBackground, outline: base_red },
    panel: {
      background: base06,
      foreground: base01,
      border: `${base03}30`,
      buttonBackground: base06,
      buttonForeground: base01,
      buttonHoverBackground: base07,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base07,
      activeForeground: base01,
      foldHover: base01,
      activeBackground: base01,
    },
    foldPlaceholder: { background: base06, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base06,
      border: `${base04}40`,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base06,
      selectedBackground: selection,
      selectedForeground: base01,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base_green,
      deletedBackground: removedBackground,
      deletedForeground: base_red,
    },
    diagnostic: { error: base_red, warning: base_orange, info: base_cyan },
    scrollbar: { track: base07, thumb: base03, thumbHover: base02 },
    merge: {
      backgroundColor: base07,
      borderColor: base03,
      buttonColor: base01,
      buttonHoverColor: selectionMatch,
    },
  },
  syntax: {
    keyword: { color: base_cyan, fontWeight: 'bold' },
    definitionKeyword: { color: base_cyan },
    modifier: { color: base_orange, fontStyle: 'italic' },
    operator: { color: base_purple },
    punctuation: { color: base03 },
    name: { color: base_blue },
    variable: { color: base01 },
    localVariable: { color: base_blue },
    variableDefinition: { color: base_blue },
    function: { color: base_cyan },
    self: { color: base_orange },
    label: { color: base_purple, fontStyle: 'italic' },
    property: { color: base_blue, fontStyle: 'normal' },
    type: { color: base_cyan },
    typeDefinition: { color: base_cyan, fontWeight: 'bold' },
    className: { color: base_yellow, fontStyle: 'italic' },
    namespace: { color: base_purple, fontStyle: 'italic' },
    tag: { color: base_purple },
    attribute: { color: base_yellow },
    string: { color: base_green },
    regexp: { color: base_magenta },
    number: { color: base_orange },
    constant: { color: base_orange },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base_green },
    annotation: { color: base_red, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base_orange },
    headingLevel: { color: base_cyan },
    list: { color: base_orange },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base_blue },
    link: {
      color: base_purple,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base_cyan, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base_green },
    strong: { fontWeight: 'bold', color: base01 },
    strikethrough: { color: base_red, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${base_red}`,
    },
    inserted: { color: base_green },
    deleted: { color: base_red },
    changed: { color: base_orange },
  },
  migration,
});

/**
 * Combined Tokyo Night Day theme extension
 */
const tokyoNightDay: Extension = theme.extension;

/**
 * Tokyo Night Day merge revert styles configuration
 */
const tokyoNightDayMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, tokyoNightDay, tokyoNightDayMergeStyles };
