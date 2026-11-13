import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Monokai theme color definitions
 * -------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#272822', // Background
  base01 = '#f8f8f2', // Foreground
  base02 = '#88846f', // Comments, invisibles
  base03 = '#f8f8f0', // Cursor
  // Accent colors
  base04 = '#F92672', // Keyword, Storage, Tag - Pink
  base05 = '#FD971F', // Variable, Parameter - Orange
  base06 = '#66D9EF', // Function, Type - Blue
  base07 = '#E6DB74', // String, RegExp - Yellow
  base08 = '#AE81FF', // Constant, Number - Purple
  base09 = '#A6E22E'; // Class, Heading - Green

// UI specific colors
const invalid = '#F44747', // Error color - Red
  darkBackground = '#414339', // Gutter background
  highlightBackground = '#3e3d3257', // Line highlight with opacity
  tooltipBackground = '#34352f', // Tooltip background - Slightly lighter than base00
  selection = '#49483E', // Selection background
  selectionMatch = '#75715e70', // Selection match with opacity
  activeBracketBg = '#75715E55'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#3d4d3880', // Dark green with transparency for insertions
  removedBackground = '#4d393980'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Monokai',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base03,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base02,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base06}40`,
    searchMatch: {
      background: `${selection}99`,
      outline: base07,
      foreground: base01,
      selectedBackground: base04,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base06 },
    nonMatchingBracket: { background: '#f9267240', outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: `${base02}80`,
      buttonBackground: tooltipBackground,
      buttonForeground: base01,
      buttonHoverBackground: selection,
    },
    gutter: {
      background: darkBackground,
      foreground: base02,
      border: '#3e3d32',
      activeBackground: '#35352c',
      activeForeground: base01,
      foldHover: base01,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: base02, border: `${base02}70` },
    tooltip: {
      background: tooltipBackground,
      border: selection,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      selectedBackground: selection,
      selectedForeground: base01,
      icon: base02,
      detail: base02,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base09,
      deletedBackground: removedBackground,
      deletedForeground: base04,
    },
    diagnostic: { error: invalid, warning: base05, info: base06 },
    scrollbar: { track: darkBackground, thumb: selection, thumbHover: '#5a594d' },
    merge: {
      backgroundColor: darkBackground,
      borderColor: base02,
      buttonColor: base01,
      buttonHoverColor: selection,
    },
  },
  syntax: {
    keyword: { color: base04, fontWeight: 'bold' },
    definitionKeyword: { color: base04 },
    modifier: { color: base08, fontStyle: 'italic' },
    operator: { color: base04 },
    punctuation: { color: base01 },
    name: { color: base05 },
    function: { color: base06 },
    self: { color: base08 },
    label: { color: base06 },
    property: { color: base09, fontStyle: 'normal' },
    type: { color: base06, fontStyle: 'italic' },
    typeDefinition: { color: base06, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base05, fontStyle: 'italic' },
    tag: { color: base04 },
    attribute: { color: base09 },
    string: { color: base07 },
    number: { color: base08 },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base02 },
    processingInstruction: { color: base09 },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base09 },
    headingLevel: { color: base09 },
    list: { color: base09 },
    quote: { color: base02 },
    monospace: { color: base01 },
    contentSeparator: { color: base05 },
    link: {
      color: base08,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base06, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base05 },
    strong: { fontWeight: 'bold', color: base05 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base09 },
    deleted: { color: invalid },
    changed: { color: base08 },
  },
});

/**
 * Combined Monokai theme extension
 */
const monokai: Extension = theme.extension;

/**
 * Monokai merge revert styles configuration
 */
const monokaiMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, monokai, monokaiMergeStyles };
