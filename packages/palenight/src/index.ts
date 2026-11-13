import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Palenight theme color definitions
 * ---------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#292D3E', // Background - deep indigo
  base01 = '#adb4d5', // Foreground - lavender blue
  base02 = '#444267', // Selection background - muted indigo
  base03 = '#9ca5ce', // Comments, invisible - steel blue
  base04 = '#BFC7D5', // Cursor - lighter lavender
  // Accent colors
  base05 = '#C3E88D', // Strings - light green
  base06 = '#82AAFF', // Keywords, Functions - sky blue
  base07 = '#C792EA', // Classes, Types - purple
  base08 = '#F78C6C', // Numbers, Constants - orange
  base09 = '#FFCB6B', // Classes, Attributes - yellow
  base0A = '#89DDFF', // Punctuation, Operators - light blue
  base0B = '#fe7f8d', // Tags, Errors - red
  base0C = '#cf93c7', // Special elements - mauve
  base0D = '#80CBC4'; // Properties - seafoam

// UI specific colors
const darkBackground = '#202331', // Darker background for panels and gutter
  highlightBackground = '#2e324817', // Active line background
  tooltipBackground = '#343A50', // Tooltip background
  selectionMatch = '#444267AA', // Selection match with opacity
  activeBracketBg = '#2E3248'; // Active bracket background

// Diff/merge specific colors
const addedBackground = '#2c3c2e80', // Dark green with transparency for insertions
  removedBackground = '#3e2e3180'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Palenight',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: '#3b385d',
    selectionInactive: '#3b385d',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base0B,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base06}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base02}CC`,
      outline: base06,
      foreground: base01,
      shadow: 'none',
      selectedBackground: base06,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base06}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base03}50` },
    matchingBracket: { background: activeBracketBg, outline: base06, shadow: 'none' },
    nonMatchingBracket: { background: `${base0B}40`, outline: base0B },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: base02,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: tooltipBackground,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: '#3A4058',
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base02}`,
    },
    gutter: {
      background: darkBackground,
      foreground: base03,
      border: '#3A405880',
      activeBackground: '#2A2D40',
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: {
      background: tooltipBackground,
      foreground: base03,
      border: `${base03}70`,
      borderStyle: 'dotted',
    },
    tooltip: {
      background: tooltipBackground,
      foreground: base01,
      border: '#3A4058',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: base04,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base05,
      insertedBorder: `1px solid ${base05}40`,
      deletedBackground: removedBackground,
      deletedForeground: base0B,
      deletedBorder: `1px solid ${base0B}40`,
    },
    diagnostic: {
      error: base0B,
      warning: base09,
      info: base06,
      hint: base06,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: base02,
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: '#515580',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3A4058',
      buttonColor: base01,
      buttonHoverColor: '#3A4058',
    },
  },
  syntax: {
    keyword: { color: base06, fontWeight: 'bold' },
    definitionKeyword: { color: base06 },
    modifier: { color: base0C, fontStyle: 'italic' },
    operator: { color: base0A },
    punctuation: { color: base0A },
    name: { color: base01 },
    localVariable: { color: base08 },
    variableDefinition: { color: base08 },
    nameDefinition: { color: base0A },
    function: { color: base06 },
    self: { color: base07 },
    label: { color: base06 },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base07 },
    typeDefinition: { color: base07, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base09, fontStyle: 'italic' },
    tag: { color: base0B },
    attribute: { color: base09 },
    content: { color: base01 },
    string: { color: base05 },
    number: { color: base08 },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base05 },
    atom: { color: base0C },
    specialVariable: { color: base0C },
    annotation: { color: base0B, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base09 },
    headingLevel: { color: base09 },
    list: { color: base09 },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base09 },
    link: {
      color: base07,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base06, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base05 },
    strong: { fontWeight: 'bold', color: base09 },
    strikethrough: { color: base0B, textDecoration: 'line-through' },
    invalid: { color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0B}` },
    inserted: { color: base05 },
    deleted: { color: base0B },
    changed: { color: base08 },
  },
});

/**
 * Combined Palenight theme extension
 */
const palenight: Extension = theme.extension;

/**
 * Palenight merge revert styles configuration
 */
const palenightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, palenight, palenightMergeStyles };
