import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Nord theme color definitions
 * ------------------------------------
 * Colors organized by function with visual color blocks
 */

// Polar Night
const base00 = '#2e3440', // Background - deep navy blue
  base01 = '#3b4252', // Lighter background (popups, statuslines)
  base02 = '#434c5e', // Selection background
  base03 = '#acb8cf', // Comments, invisibles
  // Snow Storm
  base04 = '#d8dee9', // Foreground - light blue-grey
  base05 = '#eceff4', // Light background
  // Frost
  base06 = '#92c0be', // Moss green - function names
  base07 = '#88c0d0', // Ice blue - classes, attributes
  base08 = '#9abbdc', // Water blue - methods
  base09 = '#96bbe9', // Deep blue - keywords
  // Aurora
  base0A = '#fb9ea4', // Red - errors, brackets
  base0B = '#f1a58d', // Orange - numbers, constants
  base0C = '#ebcb8b', // Yellow - types, classes
  base0D = '#a5c08e', // Green - strings
  base0E = '#d3accc'; // Purple - operators, special characters

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  darkBackground = '#252a33', // Darker background for panels
  highlightBackground = '#3b425277', // Active line highlight with opacity
  selectionMatch = '#4c566a80', // Selection match with opacity
  activeBracketBg = '#4c566a55'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Nord',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: '#40495b',
    selectionInactive: '#40495b',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base0A,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base07}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base09}80`,
      outline: base06,
      foreground: base04,
      shadow: 'none',
      selectedBackground: base08,
      selectedForeground: base05,
      selectedOutline: `1px solid ${base06}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base07, shadow: 'none' },
    nonMatchingBracket: { background: `${base0A}40`, outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base04,
      border: base03,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: base04,
      buttonBorder: 'none',
      buttonHoverBackground: base02,
      buttonHoverForeground: base04,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base03}`,
    },
    gutter: {
      background: darkBackground,
      foreground: base03,
      border: base02,
      activeBackground: base01,
      activeForeground: base04,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base04,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: base05,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0D,
      insertedBorder: `1px solid ${base0D}40`,
      deletedBackground: removedBackground,
      deletedForeground: base0A,
      deletedBorder: `1px solid ${base0A}40`,
    },
    diagnostic: {
      error: base0A,
      warning: base0C,
      info: base08,
      hint: base08,
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
      thumbHover: base03,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: base03,
      buttonColor: base04,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base09, fontWeight: 'bold' },
    definitionKeyword: { color: base09 },
    modifier: { color: base0E, fontStyle: 'italic' },
    separator: { color: base0D },
    angleBracket: { color: base0B },
    squareBracket: { color: base0A },
    brace: { color: base06 },
    operator: { color: base0E },
    punctuation: { color: base04 },
    name: { color: base07 },
    variable: { color: base04 },
    localVariable: { color: base0B },
    variableDefinition: { color: base0B },
    nameDefinition: { color: base0D },
    function: { color: base06 },
    self: { color: base0E },
    label: { color: base06 },
    property: { color: base07, fontStyle: 'normal' },
    type: { color: base0C },
    typeDefinition: { color: base0C, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base08, fontStyle: 'italic' },
    tag: { color: base0A },
    attribute: { color: base0C },
    content: { color: base04 },
    string: { color: base0D },
    regexp: { color: base0E },
    atom: { color: base0E },
    specialVariable: { color: base0E },
    number: { color: base0B },
    constant: { color: base0B },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base06 },
    annotation: { color: base0A, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    headingLevel: { color: base08 },
    list: { color: base08 },
    quote: { color: base0E },
    monospace: { color: base04, fontStyle: 'italic' },
    contentSeparator: { color: base08 },
    link: {
      color: base0E,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base08, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0C },
    strong: { fontWeight: 'bold', color: base07 },
    strikethrough: { color: base0A, textDecoration: 'line-through' },
    invalid: { color: base04, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0A}` },
    inserted: { color: base06 },
    deleted: { color: base0A },
    changed: { color: base0E },
  },
});

/**
 * Combined Nord theme extension
 */
const nord: Extension = theme.extension;

/**
 * Nord merge revert styles configuration
 */
const nordMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, nord, nordMergeStyles };
