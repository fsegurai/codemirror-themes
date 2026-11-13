import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Material Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#212121', // Background
  base01 = '#505d64', // Lighter background (popups, statuslines)
  base02 = '#606f7a', // Selection background
  base03 = '#707d8b', // Comments, invisibles, line highlighting
  base04 = '#a0a4ae', // Dark foreground (cursor)
  base05 = '#bdbdbd', // Default foreground
  base06 = '#e0e0e0', // Light foreground
  base07 = '#202325', // Dark background (gutter)
  // Accent colors
  base08 = '#ff5f52', // Keywords, storage, errors
  base09 = '#ff6e40', // Constants, attributes
  base0A = '#fa5788', // Regex, special symbols
  base0B = '#facf4e', // Classes, numbers
  base0C = '#ffad42', // Strings, values
  base0D = '#56c8d8', // Support, functions
  base0E = '#7186f0', // Variables, parameters
  base0F = '#cf6edf', // Operators, tags
  base10 = '#6abf69', // Added elements
  base11 = '#99d066', // Modified elements
  base12 = '#4ebaaa'; // Markup headings

// UI specific colors
const highlightBackground = '#2d333b30', // Line highlight with transparency
  selection = '#ffffff1f', // Selection background with transparency
  selectionMatch = '#4A707A80', // Selection match background with transparency
  activeBracketBg = '#39496650'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#1e3d2780', // Dark green with transparency for insertions
  removedBackground = '#4e282880'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Material Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#394966cc',
      outline: base0D,
      foreground: base06,
      shadow: 'none',
      selectedBackground: base0D,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base0D}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0D, shadow: 'none' },
    nonMatchingBracket: { background: `${base08}40`, outline: base08 },
    panel: {
      background: base00,
      foreground: base05,
      border: base03,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: base05,
      buttonBorder: 'none',
      buttonHoverBackground: base02,
      buttonHoverForeground: base05,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base03}`,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base01,
      activeBackground: '#252a2c',
      activeForeground: base05,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base05,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      foreground: base05,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: base06,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base10,
      insertedBorder: `1px solid ${base10}40`,
      deletedBackground: removedBackground,
      deletedForeground: base08,
      deletedBorder: `1px solid ${base08}40`,
    },
    diagnostic: {
      error: base08,
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
      track: base07,
      trackBorder: 'none',
      thumb: base02,
      thumbBorder: `3px solid ${base07}`,
      thumbHover: base03,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base07,
      borderColor: base03,
      buttonColor: base05,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base05 },
    punctuation: { color: base03 },
    name: { color: base0E },
    variable: { color: base11 },
    localVariable: { color: base0E },
    variableDefinition: { color: base0E },
    function: { color: base0D },
    self: { color: base09 },
    label: { color: base0D, fontStyle: 'italic' },
    property: { color: base0F, fontStyle: 'normal' },
    type: { color: base08 },
    typeDefinition: { color: base08, fontWeight: 'bold' },
    className: { color: base0B, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: base0B },
    content: { color: base05 },
    string: { color: base0C },
    regexp: { color: base0A },
    null: { color: base0B },
    number: { color: base0B },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base10 },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base12 },
    headingLevel: { color: base0B },
    heading2: { color: base0C },
    heading3: { color: base0D },
    heading4: { color: base0E },
    heading5: { color: base0F },
    heading6: { color: base08 },
    list: { color: base12 },
    quote: { color: base03 },
    monospace: { color: base05 },
    contentSeparator: { color: base0E },
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
    invalid: { color: base05, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base08}` },
    inserted: { color: base10 },
    deleted: { color: base08 },
    changed: { color: base0B },
  },
});

/**
 * Combined Material Dark theme extension
 */
const materialDark: Extension = theme.extension;

/**
 * Material Dark merge revert styles configuration
 */
const materialDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, materialDark, materialDarkMergeStyles };
