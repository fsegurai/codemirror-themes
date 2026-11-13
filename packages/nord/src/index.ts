import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
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
  base03 = '#4c566a', // Comments, invisibles
  // Snow Storm
  base04 = '#d8dee9', // Foreground - light blue-grey
  base05 = '#eceff4', // Light background
  // Frost
  base06 = '#8fbcbb', // Moss green - function names
  base07 = '#88c0d0', // Ice blue - classes, attributes
  base08 = '#81a1c1', // Water blue - methods
  base09 = '#5e81ac', // Deep blue - keywords
  // Aurora
  base0A = '#bf616a', // Red - errors, brackets
  base0B = '#d08770', // Orange - numbers, constants
  base0C = '#ebcb8b', // Yellow - types, classes
  base0D = '#a3be8c', // Green - strings
  base0E = '#b48ead'; // Purple - operators, special characters

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  darkBackground = '#252a33', // Darker background for panels
  highlightBackground = '#3b425277', // Active line highlight with opacity
  selectionMatch = '#4c566a80', // Selection match with opacity
  activeBracketBg = '#4c566a55'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80'; // Dark red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  highlight: [
    { tag: [t.bool, t.atom, t.special(t.variableName)], color: base0E },
    { tag: [t.separator, t.definition(t.name)], color: base0D },
    { tag: t.angleBracket, color: base0B },
    { tag: t.squareBracket, color: base0A },
    { tag: t.brace, color: base06 },
  ],
};

const theme = defineTheme({
  name: 'Nord',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
    cursor: base04,
    selection: base02,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base07}40`,
    searchMatch: {
      background: `${base09}80`,
      outline: base06,
      foreground: base04,
      selectedBackground: base08,
      selectedForeground: base05,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base07 },
    nonMatchingBracket: { background: `${base0A}40`, outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base04,
      border: base03,
      buttonBackground: base01,
      buttonForeground: base04,
      buttonHoverBackground: base02,
    },
    gutter: {
      background: darkBackground,
      foreground: base03,
      border: base02,
      activeBackground: base01,
      activeForeground: base04,
      foldHover: base04,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      selectedBackground: base02,
      selectedForeground: base05,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0D,
      deletedBackground: removedBackground,
      deletedForeground: base0A,
    },
    diagnostic: { error: base0A, warning: base0C, info: base08 },
    scrollbar: { track: darkBackground, thumb: base02, thumbHover: base03 },
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
    operator: { color: base0E },
    punctuation: { color: base04 },
    name: { color: base07 },
    variable: { color: base04 },
    localVariable: { color: base0B },
    variableDefinition: { color: base0B },
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
    string: { color: base0D },
    regexp: { color: base0E },
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
  migration,
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
