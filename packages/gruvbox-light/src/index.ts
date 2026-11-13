import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Gruvbox Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const base00 = '#3c3836', // Main foreground (text)
  base01 = '#504945', // Secondary foreground
  base02 = '#665c54', // Tertiary foreground
  base03 = '#6b5e54', // Quaternary foreground
  base04 = '#6a5c4e', // Comments, invisibles, line highlighting
  // Light/background shades
  base05 = '#fbf1c7', // Main background
  base06 = '#ebdbb2', // Secondary background
  base07 = '#d5c4a1', // Tertiary background (not defined above)
  base08 = '#bdae93', // Quaternary background
  base09 = '#a89984', // Quinary background (not defined above)
  // Accent colors
  base0A = '#9d0006', // Keywords, storage, operator
  base0B = '#65600d', // Strings, tag attributes
  base0C = '#845408', // Functions, tag names
  base0D = '#076678', // Variables
  base0E = '#8f3f71', // Numbers, special constants
  base0F = '#306947', // Types
  base10 = '#a63b0f'; // Cursor, constants

// UI specific colors
const highlightBackground = '#ffc42e25', // Line highlight with transparency
  selectionMatch = '#ffc42e40', // Selection match background
  activeBracketBg = '#d5c4a180'; // Active bracket background

// Diff/merge specific colors
const addedBackground = '#d8e5bc80', // Light base0B with transparency for insertions
  removedBackground = '#f7cfcf80'; // Light base0A with transparency for deletions

const theme = defineTheme({
  name: 'Gruvbox Light',
  dark: false,
  ui: {
    background: base05,
    foreground: base00,
    border: 'none',
    cursor: base10,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base10}99`, border: 'none' },
    selection: '#e7d7ae',
    selectionInactive: '#e7d7ae',
    selectionForeground: base00,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base04,
    ghostTextOpacity: '0.5',
    specialChar: base0A,
    focusRing: `0 0 0 2px ${base05}, 0 0 0 3px ${base10}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#ffc42e80',
      outline: base10,
      foreground: base00,
      shadow: 'none',
      selectedBackground: base10,
      selectedForeground: base05,
      selectedOutline: `1px solid ${base10}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: base08 },
    matchingBracket: { background: activeBracketBg, outline: base10, shadow: 'none' },
    nonMatchingBracket: { background: '#fb492740', outline: base0A },
    panel: {
      background: base06,
      foreground: base01,
      border: base08,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base05,
      buttonForeground: base00,
      buttonBorder: 'none',
      buttonHoverBackground: base07,
      buttonHoverForeground: base00,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base05,
      inputBorder: `1px solid ${base08}`,
    },
    gutter: {
      background: base06,
      foreground: base03,
      border: base08,
      activeBackground: base07,
      activeForeground: base00,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base00,
    },
    foldPlaceholder: { background: 'transparent', foreground: base02, border: base08, borderStyle: 'dotted' },
    tooltip: {
      background: base06,
      foreground: base00,
      border: base08,
      shadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
      listBackground: base06,
      listBorder: 'none',
      hoverBackground: `${base10}15`,
      selectedBackground: `${base10}30`,
      selectedForeground: base00,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0B,
      insertedBorder: `1px solid ${base0B}40`,
      deletedBackground: removedBackground,
      deletedForeground: base0A,
      deletedBorder: `1px solid ${base0A}40`,
    },
    diagnostic: {
      error: base0A,
      warning: base0C,
      info: base0D,
      hint: base0D,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base05,
      trackBorder: 'none',
      thumb: base08,
      thumbBorder: `3px solid ${base05}`,
      thumbHover: base09,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base06,
      borderColor: base08,
      buttonColor: base00,
      buttonHoverColor: base07,
    },
  },
  syntax: {
    keyword: { color: base0A, fontWeight: 'bold' },
    definitionKeyword: { color: base0A },
    modifier: { color: base0E, fontStyle: 'italic' },
    functionDefinition: { color: base0D },
    operator: { color: base00 },
    punctuation: { color: base04 },
    name: { color: base0D },
    function: { color: base0C },
    self: { color: base0E },
    label: { color: base0C },
    property: { color: base0F, fontStyle: 'normal' },
    type: { color: base0F },
    typeDefinition: { color: base0F, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base0D, fontStyle: 'italic' },
    tag: { color: base0A },
    attribute: { color: base0C },
    content: { color: base00 },
    string: { color: base0B },
    number: { color: base0E },
    constant: { color: base10 },
    comment: { fontStyle: 'italic', color: base04 },
    meta: { color: base04 },
    processingInstruction: { color: base0B },
    null: { color: base0E },
    annotation: { color: base0A, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0C },
    headingLevel: { color: base0C },
    list: { color: base0C },
    quote: { color: base04 },
    monospace: { color: base00 },
    contentSeparator: { color: base0D },
    link: {
      color: base0E,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0D, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base0C },
    strikethrough: { color: base0A, textDecoration: 'line-through' },
    invalid: { color: base00, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0A}` },
    inserted: { color: base0B },
    deleted: { color: base0A },
    changed: { color: base0E },
  },
});

/**
 * Combined Gruvbox Light theme extension
 */
const gruvboxLight: Extension = theme.extension;

/**
 * Gruvbox Light merge revert styles configuration
 */
const gruvboxLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, gruvboxLight, gruvboxLightMergeStyles };
