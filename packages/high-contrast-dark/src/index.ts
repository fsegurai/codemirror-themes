import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * High Contrast Dark theme color definitions
 * ------------------------------------------
 * Maximum contrast theme for accessibility
 */

// Base colors - Pure black and white for maximum contrast
const base00 = '#000000', // Background - pure black
  base01 = '#0a0a0a', // Darker background
  base02 = '#1f1f1f', // Selection background
  base03 = '#a1a1a1', // Comments - medium grey
  base04 = '#b0b0b0', // Dark grey
  base05 = '#ffffff', // Foreground - pure white
  // High contrast accent colors
  brightYellow = '#ffff00',
  brightCyan = '#00ffff',
  brightGreen = '#00ff00',
  brightRed = '#ff7967',
  brightMagenta = '#fe5dfb',
  brightBlue = '#42a6ff',
  brightOrange = '#ff9900',
  brightPurple = '#cf81f9';

// UI specific colors
const tooltipBackground = '#1a1a1a',
  selection = '#264f78',
  selectionMatch = '#264f7880';

// Diff/merge specific colors
const addedBackground = '#00550060',
  removedBackground = '#55000060';

const theme = defineTheme({
  name: 'High Contrast Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    border: `1px solid ${base04}`,
    cursor: brightYellow,
    cursorWidth: '3px',
    cursorShadow: 'none',
    fatCursor: { background: brightYellow, border: `2px solid ${base05}` },
    selection: '#1a3865',
    selectionInactive: '#1a3865',
    selectionForeground: null,
    selectionOutline: `2px solid ${brightCyan}`,
    activeLine: '#2a2a2a82',
    activeLineBorder: { left: `3px solid ${brightCyan}`, right: `1px solid ${base04}` },
    ghostText: base03,
    ghostTextOpacity: '0.7',
    specialChar: brightRed,
    searchMatch: {
      background: '#006400',
      outline: brightGreen,
      foreground: base05,
      shadow: 'none',
      selectedBackground: brightGreen,
      selectedForeground: base00,
      selectedOutline: `2px solid ${base05}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${brightCyan}50` },
    matchingBracket: { background: base02, outline: brightCyan, shadow: 'none' },
    nonMatchingBracket: { background: '#33000050', outline: brightRed },
    panel: {
      background: base00,
      foreground: base05,
      border: base04,
      borderWidth: '2px',
      outline: `1px solid ${base04}`,
      shadow: 'none',
      buttonBackground: tooltipBackground,
      buttonForeground: brightCyan,
      buttonBorder: `1px solid ${base04}`,
      buttonHoverBackground: base02,
      buttonHoverForeground: brightCyan,
      buttonHoverBorder: `1px solid ${brightCyan}`,
      buttonHoverShadow: 'none',
      inputBackground: base01,
      inputBorder: `1px solid ${base04}`,
    },
    gutter: {
      background: base00,
      foreground: base04,
      border: base04,
      activeBackground: base02,
      activeForeground: brightYellow,
      activeFontWeight: 'bold',
      activeBorder: `1px solid ${base03}`,
      foldHover: brightCyan,
    },
    foldPlaceholder: {
      background: tooltipBackground,
      foreground: brightCyan,
      border: brightCyan,
      borderStyle: 'solid',
    },
    tooltip: {
      background: tooltipBackground,
      foreground: base05,
      border: brightCyan,
      listBackground: tooltipBackground,
      listBorder: `1px solid ${base04}`,
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: brightYellow,
      selectedBorder: `1px solid ${brightCyan}`,
      icon: brightCyan,
      detail: brightYellow,
      shadow: 'none',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: brightGreen,
      insertedBorder: `1px solid ${brightGreen}`,
      deletedBackground: removedBackground,
      deletedForeground: brightRed,
      deletedBorder: `1px solid ${brightRed}`,
    },
    diagnostic: {
      error: brightRed,
      warning: brightYellow,
      info: brightCyan,
      hint: brightCyan,
      errorBackground: '#33000020',
      warningBackground: '#33330020',
      infoBackground: '#00333320',
      borderWidth: '4px',
      underlineWidth: '3px',
    },
    scrollbar: {
      track: base00,
      trackBorder: `1px solid ${base04}`,
      thumb: base04,
      thumbBorder: `2px solid ${base05}`,
      thumbHover: brightCyan,
      thumbHoverShadow: 'none',
    },
    focusRing: `0 0 0 2px ${base00}, 0 0 0 5px ${brightCyan}`,
    outlineWidth: '2px',
    merge: {
      backgroundColor: base00,
      borderColor: brightCyan,
      buttonColor: brightCyan,
      buttonHoverColor: brightYellow,
    },
  },
  syntax: {
    keyword: { color: brightMagenta, fontWeight: 'bold' },
    definitionKeyword: { color: brightMagenta },
    modifier: { color: brightPurple, fontStyle: 'italic' },
    separator: { color: brightCyan },
    operator: { color: brightCyan },
    punctuation: { color: base05 },
    bracket: { color: brightYellow },
    angleBracket: { color: brightCyan },
    brace: { color: brightCyan },
    name: { color: base05 },
    localVariable: { color: brightOrange },
    variableDefinition: { color: brightOrange },
    nameDefinition: { color: brightCyan },
    function: { color: brightBlue },
    self: { color: brightRed },
    label: { color: brightBlue },
    property: { color: brightCyan, fontStyle: 'normal' },
    type: { color: brightYellow },
    typeDefinition: { color: brightYellow, fontWeight: 'bold' },
    className: { color: brightYellow, fontStyle: 'italic' },
    namespace: { color: brightOrange, fontStyle: 'italic' },
    tag: { color: brightMagenta },
    attribute: { color: brightYellow },
    content: { color: base05 },
    string: { color: brightGreen },
    regexp: { color: brightMagenta },
    number: { color: brightOrange },
    constant: { color: brightOrange },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: brightGreen },
    annotation: { color: brightRed, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: brightMagenta },
    headingLevel: { color: brightMagenta },
    list: { color: brightMagenta },
    quote: { color: brightPurple },
    monospace: { color: brightBlue, fontStyle: 'italic' },
    contentSeparator: { color: brightPurple },
    link: {
      color: brightMagenta,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: brightCyan, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: brightMagenta },
    strong: { fontWeight: 'bold', color: brightOrange },
    strikethrough: { color: brightRed, textDecoration: 'line-through' },
    invalid: {
      color: brightRed,
      textDecoration: 'underline wavy',
      borderBottom: `2px wavy ${brightRed}`,
    },
    inserted: { color: brightGreen },
    deleted: { color: brightRed },
    changed: { color: brightYellow },
  },
});

/**
 * Combined High Contrast Dark theme extension
 */
const highContrastDark: Extension = theme.extension;

/**
 * High Contrast Dark merge revert styles configuration
 */
const highContrastDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, highContrastDark, highContrastDarkMergeStyles };
