import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Catppuccin Mocha theme color definitions
 * ----------------------------------------
 * A soothing pastel theme with warm tones
 */

// Base colors (Mocha variant)
const base00 = '#1e1e2e', // Background - dark navy
  base01 = '#313244', // Selection background
  base02 = '#9c9fb5', // Comments
  base03 = '#9b9fb6', // Dark grey
  base04 = '#cdd6f4', // Foreground - light blue
  base05 = '#f5e0dc', // Light foreground
  // Catppuccin Mocha colors
  flamingo = '#f2cdcd',
  pink = '#f5c2e7',
  mauve = '#cba6f7',
  red = '#f38ba8',
  maroon = '#eba0ac',
  peach = '#fab387',
  yellow = '#f9e2af',
  green = '#a6e3a1',
  teal = '#94e2d5',
  sky = '#89dceb',
  sapphire = '#74c7ec',
  blue = '#89b4fa',
  lavender = '#b4befe';

// UI specific colors
const darkBackground = '#181825',
  selectionMatch = '#45475a80',
  activeBracketBg = '#45475a55';

// Diff/merge specific colors
const addedBackground = '#a6e3a140',
  removedBackground = '#f38ba840';

const theme = defineTheme({
  name: 'Catppuccin Mocha',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
    border: 'none',
    cursor: base05,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base05}99`, border: 'none' },
    selection: '#585b7066',
    selectionInactive: '#585b7066',
    selectionForeground: null,
    selectionOutline: `1px solid ${mauve}`,
    activeLine: '#3a3a525f',
    activeLineBorder: { left: `2px solid ${lavender}`, right: 'none' },
    ghostText: base02,
    ghostTextOpacity: '0.5',
    specialChar: red,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${lavender}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${blue}40`,
      outline: sapphire,
      foreground: base04,
      shadow: 'none',
      selectedBackground: blue,
      selectedForeground: base00,
      selectedOutline: `1px solid ${sapphire}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base01}50` },
    matchingBracket: { background: activeBracketBg, outline: lavender, shadow: 'none' },
    nonMatchingBracket: { background: removedBackground, outline: red },
    panel: {
      background: darkBackground,
      foreground: base04,
      border: base02,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: base04,
      buttonBorder: 'none',
      buttonHoverBackground: base01,
      buttonHoverForeground: base04,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base02}`,
    },
    gutter: {
      background: darkBackground,
      foreground: base02,
      border: base01,
      activeBackground: base01,
      activeForeground: base04,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base02, border: `${base02}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base04,
      border: base02,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base01,
      selectedForeground: base05,
      selectedBorder: 'none',
      icon: base02,
      detail: base02,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: green,
      insertedBorder: `1px solid ${green}40`,
      deletedBackground: removedBackground,
      deletedForeground: red,
      deletedBorder: `1px solid ${red}40`,
    },
    diagnostic: {
      error: red,
      warning: yellow,
      info: blue,
      hint: blue,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: base01,
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: base02,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: base02,
      buttonColor: base04,
      buttonHoverColor: base01,
    },
  },
  syntax: {
    keyword: { color: mauve, fontWeight: 'bold' },
    definitionKeyword: { color: mauve },
    modifier: { color: mauve, fontStyle: 'italic' },
    separator: { color: flamingo },
    angleBracket: { color: sky },
    squareBracket: { color: maroon },
    brace: { color: teal },
    operator: { color: sky },
    punctuation: { color: base03 },
    name: { color: base04 },
    localVariable: { color: peach },
    variableDefinition: { color: peach },
    nameDefinition: { color: flamingo },
    function: { color: blue },
    self: { color: red },
    label: { color: blue },
    property: { color: blue, fontStyle: 'normal' },
    type: { color: yellow },
    typeDefinition: { color: yellow, fontWeight: 'bold' },
    className: { color: yellow, fontStyle: 'italic' },
    namespace: { color: peach, fontStyle: 'italic' },
    tag: { color: pink },
    attribute: { color: yellow },
    content: { color: base04 },
    string: { color: green },
    regexp: { color: pink },
    number: { color: peach },
    constant: { color: peach },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base02 },
    processingInstruction: { color: green },
    annotation: { color: red, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: mauve },
    headingLevel: { color: mauve },
    list: { color: mauve },
    quote: { color: lavender },
    monospace: { color: teal, fontStyle: 'italic' },
    contentSeparator: { color: sapphire },
    link: {
      color: mauve,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: blue, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: pink },
    strong: { fontWeight: 'bold', color: maroon },
    strikethrough: { color: red, textDecoration: 'line-through' },
    invalid: { color: red, textDecoration: 'underline wavy', borderBottom: `1px wavy ${red}` },
    inserted: { color: green },
    deleted: { color: red },
    changed: { color: yellow },
  },
});

/**
 * Combined Catppuccin Mocha theme extension
 */
const catppuccinMocha: Extension = theme.extension;

/**
 * Catppuccin Mocha merge revert styles configuration
 */
const catppuccinMochaMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, catppuccinMocha, catppuccinMochaMergeStyles };
