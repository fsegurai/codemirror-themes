import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Gruvbox Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const base00 = '#282828', // Background
  base01 = '#3c3836', // Lighter background (popups, statuslines)
  base02 = '#504945', // Selection background
  base03 = '#665c54', // Comments, invisibles, line highlighting
  base04 = '#7c6f64', // Dark foreground (status bars)
  base05 = '#b6a797', // Comments, invisibles, line highlighting
  // Light/foreground shades
  base06 = '#fbf1c7', // Light foreground (preferbase08)
  base07 = '#ebdbb2', // Light foreground (alternative)
  // Accent colors
  base08 = '#fb8a77', // Keywords, storage, operator
  base09 = '#b8bb26', // Strings, tag attributes
  base0A = '#fabd2f', // Functions, tag names
  base0B = '#8eb1a3', // Variables
  base0C = '#e193a8', // Numbers, special constants
  base0D = '#8ec07c', // Types
  base0E = '#fa8d44'; // Cursor, constants

// UI specific colors
const highlightBackground = '#3c383660', // Line highlight with transparency
  selectionMatch = '#665c5480', // Selection match background
  activeBracketBg = '#504945cc'; // Active bracket background

// Diff/merge specific colors
const addedBackground = '#32361a80', // Dark base09 with transparency for insertions
  removedBackground = '#3c1f1e80'; // Dark base08 with transparency for deletions

const theme = defineTheme({
  name: 'Gruvbox Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base07,
    border: 'none',
    cursor: base0E,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base0E}99`, border: 'none' },
    selection: '#443d39',
    selectionInactive: '#443d39',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base05,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0E}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#b57614cc',
      outline: base0A,
      foreground: base06,
      shadow: 'none',
      selectedBackground: base0E,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base0A}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: base03 },
    matchingBracket: { background: activeBracketBg, outline: base0A, shadow: 'none' },
    nonMatchingBracket: { background: '#cc241d55', outline: base08 },
    panel: {
      background: base01,
      foreground: base07,
      border: base03,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: base07,
      buttonBorder: 'none',
      buttonHoverBackground: base02,
      buttonHoverForeground: base07,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base03}`,
    },
    gutter: {
      background: base01,
      foreground: base05,
      border: base02,
      activeBackground: base01,
      activeForeground: base07,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base07,
    },
    foldPlaceholder: { background: base01, foreground: base05, border: base03, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base07,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: base06,
      selectedBorder: 'none',
      icon: base05,
      detail: base05,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base09,
      insertedBorder: `1px solid ${base09}40`,
      deletedBackground: removedBackground,
      deletedForeground: base08,
      deletedBorder: `1px solid ${base08}40`,
    },
    diagnostic: {
      error: base08,
      warning: base0A,
      info: base0B,
      hint: base0B,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base01,
      trackBorder: 'none',
      thumb: base03,
      thumbBorder: `3px solid ${base01}`,
      thumbHover: base04,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base01,
      borderColor: base03,
      buttonColor: base07,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base0C, fontStyle: 'italic' },
    functionDefinition: { color: base0B },
    operator: { color: base07 },
    punctuation: { color: base05 },
    name: { color: base0B },
    function: { color: base0A },
    self: { color: base0C },
    label: { color: base0A },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base0D },
    typeDefinition: { color: base0D, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base0B, fontStyle: 'italic' },
    tag: { color: base08 },
    attribute: { color: base0A },
    content: { color: base07 },
    string: { color: base09 },
    number: { color: base0C },
    constant: { color: base0E },
    comment: { fontStyle: 'italic', color: base05 },
    meta: { color: base05 },
    processingInstruction: { color: base09 },
    null: { color: base0C },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0A },
    headingLevel: { color: base0A },
    list: { color: base0A },
    quote: { color: base05 },
    monospace: { color: base07 },
    contentSeparator: { color: base0B },
    link: {
      color: base0C,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base09 },
    strong: { fontWeight: 'bold', color: base0A },
    strikethrough: { color: base08, textDecoration: 'line-through' },
    invalid: { color: base07, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base08}` },
    inserted: { color: base09 },
    deleted: { color: base08 },
    changed: { color: base0C },
  },
});

/**
 * Combined Gruvbox Dark theme extension
 */
const gruvboxDark: Extension = theme.extension;

/**
 * Gruvbox Dark merge revert styles configuration
 */
const gruvboxDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, gruvboxDark, gruvboxDarkMergeStyles };
