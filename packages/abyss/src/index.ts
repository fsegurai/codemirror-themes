import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

// Base colors - Ocean depths
const base00 = '#000c18', // - Background (deep ocean blue)
  base01 = '#a3c9e9', // - Foreground (lighter blue for enhanced readability)
  base02 = '#032d4a', // - Selection (more vibrant blue for better visibility)
  base03 = '#b4a2f7', // - Gutter background (darker for contrast)
  base04 = '#e6d4a3', // - Cursor (warmer gold for better visibility)
  base05 = '#0066ff20', // - Active line (subtle blue tint)
  base06 = '#ffffff', // - Pure white for maximum contrast
  base07 = '#47c1ff', // - Keywords (brighter cyan blue)
  base08 = '#5caeff', // - Variables (softer azure blue)
  base09 = '#7599c2', // - Comments (brighter blue-gray)
  base0A = '#4ce660', // - Strings (kept vibrant green for contrast)
  base0B = '#c3a2f7', // - Functions (softer purple)
  base0C = '#ff9eea', // - Constants (softer pink)
  base0D = '#ffd47b', // - Classes (warmer gold)
  base0E = '#8eb8ff', // - Headings (brighter sky blue)
  base0F = '#59d6ff', // - Tags (brighter cyan)
  base10 = '#ff50c8', // - Links (brighter magenta)
  base11 = '#66ecd4', // - URLs (brighter teal)
  // UI elements
  invalid = '#ff5370',
  darkBackground = '#0a1422', // Darker background for better contrast
  highlightBackground = '#0055ff15',
  tooltipBackground = '#05101d', // Darker tooltip for better contrast
  activeBracketBg = '#0a5999b0',
  // Diff/merge specific colors
  addedBackground = '#0e4e1d50', // Dark green with transparency for insertions
  removedBackground = '#78112240', // Dark red with transparency for deletions
  removedText = '#ff6b7d'; // Bright red for removed text

const theme = defineTheme({
  name: 'Abyss',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: base02,
    selectionInactive: base02,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base06,
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base05}, 0 0 0 4px ${base00}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#155ab380',
      outline: base08,
      foreground: base06,
      shadow: 'none',
      selectedBackground: '#2a6ac080',
      selectedForeground: base06,
      selectedOutline: `1px solid ${base08}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: '#155ab340', outline: base08 },
    matchingBracket: { background: activeBracketBg, outline: base0F, shadow: 'none' },
    nonMatchingBracket: { background: '#780e1e80', outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: '#0a3555',
      borderWidth: '2px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: darkBackground,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: '#0a3555',
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: '1px solid #0a3555',
    },
    gutter: {
      background: darkBackground,
      foreground: '#62829b',
      activeBackground: highlightBackground,
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
      border: '#0a3555',
    },
    foldPlaceholder: { background: 'transparent', foreground: '#62829b', border: base0F, borderStyle: 'dotted' },
    tooltip: {
      background: tooltipBackground,
      foreground: base01,
      border: '#084671',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
      selectedBackground: '#084671',
      selectedForeground: '#e0edff',
      selectedBorder: 'none',
      icon: '#62829b',
      detail: '#62829b',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      insertedBorder: `1px solid ${base0A}40`,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
      deletedBorder: `1px solid ${removedText}40`,
    },
    diagnostic: {
      error: invalid,
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
      track: darkBackground,
      trackBorder: 'none',
      thumb: '#62829b',
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: '#4cc9ff',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#084671',
      buttonColor: base01,
      buttonHoverColor: '#0a3555',
    },
  },
  syntax: {
    keyword: { color: base07, fontWeight: 'bold' },
    definitionKeyword: { color: base07 },
    operatorKeyword: { color: '#78b6ff' },
    modifier: { color: base0C, fontStyle: 'italic' },
    arithmeticOperator: { color: base0E },
    logicOperator: { color: base0E },
    compareOperator: { color: base0E },
    bitwiseOperator: { color: base0E },
    updateOperator: { color: base0E },
    derefOperator: { color: base0E },
    operator: { color: '#78b6ff' },
    punctuation: { color: '#8da0bf' },
    bracket: { color: '#8da0bf' },
    paren: { color: base01 },
    squareBracket: { color: base01 },
    angleBracket: { color: base01 },
    name: { color: base08 },
    variable: { color: '#7ab2ff' },
    localVariable: { color: base0B },
    variableDefinition: { color: base0B },
    nameDefinition: { color: base08 },
    function: { color: base0B },
    self: { color: base0C },
    label: { color: base0B },
    property: { color: base0E, fontStyle: 'normal' },
    type: { color: base03 },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0D, fontStyle: 'italic' },
    namespace: { color: base0C, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: '#ffd580' },
    content: { color: base01 },
    string: { color: base0A },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base09 },
    meta: { color: base09 },
    processingInstruction: { color: base0A },
    atom: { color: '#ff9e64' },
    specialVariable: { color: '#ff9e64' },
    annotation: { color: base0C, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0E },
    headingLevel: { color: base0E },
    list: { color: base0E },
    monospace: { color: base0E },
    contentSeparator: { color: base0E },
    link: { color: base10, fontWeight: '500' },
    url: { color: base11, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base0A },
    deleted: { color: base08 },
    changed: { color: base0C },
  },
});

/**
 * Combined Abyss theme extension
 */
const abyss: Extension = theme.extension;

/**
 * Abyss merge revert styles configuration
 */
const abyssMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { abyss, abyssMergeStyles, applyMergeRevertStyles };
