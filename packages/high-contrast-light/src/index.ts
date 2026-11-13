import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * High Contrast Light theme color definitions
 * -------------------------------------------
 * Maximum contrast theme for accessibility (light variant)
 */

// Base colors - Pure white and black for maximum contrast
const base00 = '#ffffff', // Background - pure white
  base01 = '#e0e0e0', // Selection background
  base02 = '#4f4f4f', // Comments - medium grey
  base03 = '#505050', // Dark grey
  base04 = '#000000', // Foreground - pure black
  // High contrast accent colors for a light background
  darkBlue = '#0000ff',
  darkCyan = '#095959',
  darkGreen = '#0e5d0c',
  darkRed = '#a40000',
  darkMagenta = '#800080',
  darkOrange = '#8e3003',
  darkPurple = '#6600cc',
  darkBrown = '#7c3400';

// UI specific colors
const tooltipBackground = '#f0f0f0',
  selection = '#0078d4',
  selectionMatch = '#0078d480';

// Diff/merge specific colors
const addedBackground = '#00800040',
  removedBackground = '#c8000040';

const theme = defineTheme({
  name: 'High Contrast Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base04,
    border: `2px solid ${base04}`,
    cursor: darkBlue,
    cursorWidth: '3px',
    cursorShadow: 'none',
    fatCursor: { background: darkBlue, border: `2px solid ${base04}` },
    selection: '#9fc3fe',
    selectionInactive: '#9fc3fe',
    selectionForeground: null,
    selectionOutline: `2px solid ${darkBlue}`,
    activeLine: '#ffffccba',
    activeLineBorder: { left: `3px solid ${darkBlue}`, right: `1px solid ${base02}` },
    ghostText: base02,
    ghostTextOpacity: '0.7',
    specialChar: darkRed,
    searchMatch: {
      background: '#ffff00',
      outline: darkOrange,
      foreground: base04,
      shadow: 'none',
      selectedBackground: darkOrange,
      selectedForeground: base00,
      selectedOutline: `2px solid ${base04}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${darkBlue}50` },
    matchingBracket: { background: base01, outline: darkCyan, shadow: 'none' },
    nonMatchingBracket: { background: '#ff000030', outline: darkRed },
    panel: {
      background: base00,
      foreground: base04,
      border: base04,
      borderWidth: '2px',
      outline: `2px solid ${base04}`,
      shadow: 'none',
      buttonBackground: tooltipBackground,
      buttonForeground: darkBlue,
      buttonBorder: `2px solid ${base04}`,
      buttonHoverBackground: base01,
      buttonHoverForeground: darkBlue,
      buttonHoverBorder: `2px solid ${darkBlue}`,
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `2px solid ${base04}`,
    },
    gutter: {
      background: base00,
      foreground: base03,
      border: base04,
      activeBackground: base01,
      activeForeground: darkBlue,
      activeFontWeight: 'bold',
      activeBorder: `1px solid ${base02}`,
      foldHover: darkCyan,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: darkBlue, border: darkBlue, borderStyle: 'solid' },
    tooltip: {
      background: tooltipBackground,
      foreground: base04,
      border: darkBlue,
      listBackground: tooltipBackground,
      listBorder: `2px solid ${base04}`,
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: base00,
      selectedBorder: `2px solid ${darkBlue}`,
      icon: darkCyan,
      detail: darkOrange,
      shadow: 'none',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: darkGreen,
      insertedBorder: `2px solid ${darkGreen}`,
      deletedBackground: removedBackground,
      deletedForeground: darkRed,
      deletedBorder: `2px solid ${darkRed}`,
    },
    diagnostic: {
      error: darkRed,
      warning: darkOrange,
      info: darkBlue,
      hint: darkBlue,
      errorBackground: '#ff000020',
      warningBackground: '#ff990020',
      infoBackground: `${darkBlue}20`,
      borderWidth: '4px',
      underlineWidth: '3px',
    },
    scrollbar: {
      track: base00,
      trackBorder: `2px solid ${base04}`,
      thumb: base03,
      thumbBorder: `2px solid ${base04}`,
      thumbHover: darkBlue,
      thumbHoverShadow: 'none',
    },
    focusRing: `0 0 0 2px ${base00}, 0 0 0 5px ${darkBlue}`,
    outlineWidth: '2px',
    merge: {
      backgroundColor: base00,
      borderColor: darkBlue,
      buttonColor: darkBlue,
      buttonHoverColor: darkOrange,
    },
  },
  syntax: {
    keyword: { color: darkMagenta, fontWeight: 'bold' },
    definitionKeyword: { color: darkMagenta },
    modifier: { color: darkPurple, fontStyle: 'italic' },
    separator: { color: darkBlue },
    operator: { color: darkCyan },
    punctuation: { color: base04 },
    bracket: { color: darkBrown },
    angleBracket: { color: darkCyan },
    brace: { color: darkCyan },
    name: { color: base04 },
    localVariable: { color: darkOrange },
    variableDefinition: { color: darkOrange },
    nameDefinition: { color: darkBlue },
    function: { color: darkBlue },
    self: { color: darkRed },
    label: { color: darkBlue },
    property: { color: darkBlue, fontStyle: 'normal' },
    type: { color: darkCyan },
    typeDefinition: { color: darkCyan, fontWeight: 'bold' },
    className: { color: darkCyan, fontStyle: 'italic' },
    namespace: { color: darkOrange, fontStyle: 'italic' },
    tag: { color: darkMagenta },
    attribute: { color: darkCyan },
    content: { color: base04 },
    string: { color: darkGreen },
    regexp: { color: darkMagenta },
    number: { color: darkOrange },
    constant: { color: darkOrange },
    comment: { fontStyle: 'italic', color: base02 },
    meta: { color: base02 },
    processingInstruction: { color: darkGreen },
    annotation: { color: darkRed, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: darkMagenta },
    headingLevel: { color: darkMagenta },
    list: { color: darkMagenta },
    quote: { color: darkPurple },
    monospace: { color: darkBlue, fontStyle: 'italic' },
    contentSeparator: { color: darkPurple },
    link: {
      color: darkPurple,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: darkBlue, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: darkMagenta },
    strong: { fontWeight: 'bold', color: darkOrange },
    strikethrough: { color: darkRed, textDecoration: 'line-through' },
    invalid: {
      color: darkRed,
      textDecoration: 'underline wavy',
      borderBottom: `2px wavy ${darkRed}`,
    },
    inserted: { color: darkGreen },
    deleted: { color: darkRed },
    changed: { color: darkOrange },
  },
});

/**
 * Combined High Contrast Light theme extension
 */
const highContrastLight: Extension = theme.extension;

/**
 * High Contrast Light merge revert styles configuration
 */
const highContrastLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, highContrastLight, highContrastLightMergeStyles };
