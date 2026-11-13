import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Catppuccin Latte theme color definitions
 * ----------------------------------------
 * Palette from the official Catppuccin palette (Latte flavor): https://catppuccin.com/palette
 * (Catppuccin, MIT License, https://github.com/catppuccin/palette/blob/main/LICENSE).
 * Colors below WCAG AA keep their hue and only shift lightness (OKLCH); the official value is noted next to them.
 * Roles follow the Catppuccin Mocha package of this library, so both flavors read the same.
 */

// Base colors (Latte variant)
const base00 = '#eff1f5', // Base - background
  base01 = '#ccd0da', // Surface0
  base02 = '#5a5c6f', // Overlay2 - comments, official #7c7f93
  base03 = '#5a5c6f', // Overlay2 - punctuation, official #7c7f93
  base04 = '#4c4f69', // Text - foreground
  base05 = '#bf705f', // Rosewater - cursor, official #dc8a78
  // Catppuccin Latte colors
  flamingo = '#9d3f42', // official #dd7878
  pink = '#9f2f85', // official #ea76cb
  mauve = '#7c26e0', // official #8839ef
  red = '#bd0231', // official #d20f39
  maroon = '#bb0e31', // official #e64553
  peach = '#a33c01', // official #fe640b
  yellow = '#865201', // official #df8e1d
  green = '#1b6c02', // official #40a02b
  teal = '#03686d', // official #179299
  sky = '#02648d', // official #04a5e5
  sapphire = '#036776', // official #209fb5
  blue = '#0450de', // official #1e66f5
  lavender = '#4451c2'; // official #7287fd

// UI specific colors
const darkBackground = '#e6e9ef', // Mantle
  selectionMatch = '#acb0be80', // Surface2
  activeBracketBg = '#bcc0cc80'; // Surface1

// Diff/merge specific colors
const addedBackground = '#40a02b26',
  removedBackground = '#d20f3926';

const theme = defineTheme({
  name: 'Catppuccin Latte',
  dark: false,
  ui: {
    background: base00,
    foreground: base04,
    border: 'none',
    cursor: base05,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base05}99`, border: 'none' },
    selection: '#acb0be66',
    selectionInactive: '#acb0be66',
    selectionForeground: null,
    selectionOutline: `1px solid ${mauve}`,
    activeLine: '#ccd0da40', // Surface0 at 25% so the selection stays visible on the active line
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
      shadow: '0 2px 8px rgba(76, 79, 105, 0.2)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base01,
      selectedForeground: base04,
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
 * Combined Catppuccin Latte theme extension
 */
const catppuccinLatte: Extension = theme.extension;

/**
 * Catppuccin Latte merge revert styles configuration
 */
const catppuccinLatteMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, catppuccinLatte, catppuccinLatteMergeStyles };
