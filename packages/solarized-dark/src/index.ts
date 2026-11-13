import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Solarized Dark theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#002b36', // Background - dark blue
  base01 = '#073642', // Lighter background (popups, statuslines)
  base02 = '#8ba2aa', // Selection background
  base03 = '#657b83', // Comments, invisibles
  base04 = '#91a2a4', // Body text
  base05 = '#a0afaf', // Default foreground
  base06 = '#eee8d5', // Light foreground
  base07 = '#fdf6e3', // Light background
  // Accent colors from Solarized palette
  base08 = '#fb7569', // Red
  base09 = '#fb7748', // Orange
  base0A = '#c49823', // Yellow
  base0B = '#93a823', // Green
  base0C = '#3cafa5', // Cyan
  base0D = '#45a5ee', // Blue
  base0E = '#9097ed', // Violet
  base0F = '#fd6baa'; // Magenta

// UI specific colors
const invalid = '#fb7565', // Bright red for errors
  darkBackground = '#00252f', // Darker background for panels
  highlightBackground = '#99eeff0f', // Active line highlight
  selection = '#02B8FF3F', // Selection background with opacity
  selectionMatch = '#586e7580', // Selection match with opacity
  activeBracketBg = '#586e7540'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#2aa19820', // Solarized cyan with transparency for insertions
  removedBackground = '#dc322f20'; // Solarized red with transparency for deletions

const theme = defineTheme({
  name: 'Solarized Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: '#02b8ff1d',
    selectionInactive: '#02b8ff1d',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: '#99eeff0d',
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base02}99`,
      outline: base0D,
      foreground: base06,
      shadow: 'none',
      selectedBackground: base0D,
      selectedForeground: base07,
      selectedOutline: `1px solid ${base0D}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0D, shadow: 'none' },
    nonMatchingBracket: { background: `${base08}40`, outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base04,
      border: base01,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: base05,
      buttonBorder: 'none',
      buttonHoverBackground: highlightBackground,
      buttonHoverForeground: base05,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base01}`,
    },
    gutter: {
      background: darkBackground,
      foreground: base02,
      border: base01,
      activeBackground: base01,
      activeForeground: base05,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base02}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base05,
      border: base02,
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
      insertedForeground: base0B,
      insertedBorder: `1px solid ${base0B}40`,
      deletedBackground: removedBackground,
      deletedForeground: base08,
      deletedBorder: `1px solid ${base08}40`,
    },
    diagnostic: {
      error: base08,
      warning: base0A,
      info: base0D,
      hint: base0D,
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
      buttonColor: base05,
      buttonHoverColor: base01,
    },
  },
  syntax: {
    keyword: { color: base0B, fontWeight: 'bold' },
    definitionKeyword: { color: base0B },
    modifier: { color: base0F, fontStyle: 'italic' },
    separator: { color: base0C },
    operator: { color: base0E },
    punctuation: { color: base04 },
    bracket: { color: base0F },
    angleBracket: { color: base02 },
    squareBracket: { color: base08 },
    name: { color: base0C },
    variable: { color: base05 },
    localVariable: { color: base0C },
    variableDefinition: { color: base0C },
    function: { color: base0D },
    self: { color: base0F },
    label: { color: base0F },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base09 },
    typeDefinition: { color: base09, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base0F, fontStyle: 'italic' },
    tag: { color: base0D },
    attribute: { color: base05 },
    content: { color: base05 },
    string: { color: base0A },
    regexp: { color: invalid },
    constantName: { color: base0A },
    standardName: { color: base0A },
    number: { color: base0F },
    constant: { color: base0F },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base08 },
    processingInstruction: { color: base0B },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0A },
    headingLevel: { color: base06 },
    heading1: { color: base07 },
    list: { color: base0A },
    quote: { color: base0B },
    monospace: { color: base05 },
    contentSeparator: { color: base0A },
    link: {
      color: base0C,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0A, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base06 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base02,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base08}`,
    },
    inserted: { color: base0B },
    deleted: { color: base08 },
    changed: { color: base0F },
  },
});

/**
 * Combined Solarized Dark theme extension
 */
const solarizedDark: Extension = theme.extension;

/**
 * Solarized Dark merge revert styles configuration
 */
const solarizedDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, solarizedDark, solarizedDarkMergeStyles };
