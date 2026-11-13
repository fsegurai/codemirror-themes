import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Volcano theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#390000', // Background
  base01 = '#F8F8F8', // Foreground
  base02 = '#750000', // Selection background
  base03 = '#e7c0c0', // Comments, invisibles
  base04 = '#dd0000', // Cursor
  base05 = '#fc594d', // Default foreground
  base06 = '#580000', // Dark background for panels
  base07 = '#4a0000', // Darker background (gutter)
  // Accent colors
  base08 = '#f95d54', // Errors, invalid
  base09 = '#d47b3c', // Numbers, constants
  base0A = '#fec758', // Classes, attributes
  base0B = '#9df39f', // Success
  base0C = '#7df3f7', // Functions, parameters
  base0D = '#7dcaf7', // Variables
  base0E = '#c27df7', // Keywords, operators
  base0F = '#f77dca'; // Special characters

// UI specific colors
const invalid = '#ffffff',
  highlightBackground = '#ff000013', // Line highlight with transparency
  tooltipBackground = '#680000',
  selection = '#75000080', // Selection background with transparency
  selectionMatch = '#7500009a', // Selection match with transparency
  activeBracketBg = '#ff550040'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#2a4a0080', // Dark green with transparency for insertions
  removedBackground = '#750000a0'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Volcano',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: '#7500009c',
    selectionInactive: '#7500009c',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base08}`,
    outlineWidth: '1px',
    searchMatch: {
      background: selection,
      outline: base08,
      foreground: base01,
      shadow: 'none',
      selectedBackground: base08,
      selectedForeground: base01,
      selectedOutline: `1px solid ${base08}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base08, shadow: 'none' },
    nonMatchingBracket: { background: `${base08}40`, outline: invalid },
    panel: {
      background: base06,
      foreground: base01,
      border: base00,
      borderWidth: '2px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base07,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: base02,
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: '0 0 4px #ff550080',
      inputBackground: base00,
      inputBorder: `1px solid ${base00}`,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base06,
      activeBackground: '#550000',
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
      border: `${base08}60`,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: base01,
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
      warning: base09,
      info: base0C,
      hint: base0C,
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
      thumbHover: base08,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: tooltipBackground,
      borderColor: base07,
      buttonColor: base01,
      buttonHoverColor: base08,
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base09, fontStyle: 'italic' },
    separator: { color: base01 },
    operator: { color: base0E },
    punctuation: { color: base03 },
    name: { color: base01 },
    variable: { color: base0A },
    nameDefinition: { color: base01 },
    function: { color: base0C },
    self: { color: base09 },
    label: { color: base0C, fontStyle: 'italic' },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base0D, fontStyle: 'italic' },
    tag: { color: base08 },
    attribute: { color: base0A },
    content: { color: base01 },
    string: { color: base0A },
    regexp: { color: base0F },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base0B },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base09 },
    headingLevel: { color: base08, fontWeight: 'bold' },
    heading2: { color: base09 },
    heading3: { color: base0A },
    heading4: { color: base0B },
    heading5: { color: base0C },
    heading6: { color: base0D },
    list: { color: base09 },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base0D },
    link: {
      color: base0E,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0C, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0A },
    strong: { fontWeight: 'bold', color: base01 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base0B },
    deleted: { color: base08 },
    changed: { color: base09 },
  },
});

/**
 * Combined Volcano theme extension
 */
const volcano: Extension = theme.extension;

/**
 * Volcano merge revert styles configuration
 */
const volcanoMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, volcano, volcanoMergeStyles };
