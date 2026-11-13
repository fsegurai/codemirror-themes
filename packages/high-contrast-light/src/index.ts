import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * High Contrast Light theme color definitions
 * -------------------------------------------
 * Maximum contrast theme for accessibility (light variant)
 */

// Base colors - Pure white and black for maximum contrast
const base00 = '#ffffff', // Background - pure white
  base01 = '#e0e0e0', // Selection background
  base02 = '#707070', // Comments - medium grey
  base03 = '#505050', // Dark grey
  base04 = '#000000', // Foreground - pure black
  // High contrast accent colors for a light background
  darkBlue = '#0000ff',
  darkCyan = '#008080',
  darkGreen = '#008000',
  darkRed = '#c80000',
  darkMagenta = '#800080',
  darkOrange = '#d04800',
  darkPurple = '#6600cc',
  darkBrown = '#7c3400';

// UI specific colors
const tooltipBackground = '#f0f0f0',
  selection = '#0078d4',
  selectionMatch = '#0078d480';

// Diff/merge specific colors
const addedBackground = '#00800040',
  removedBackground = '#c8000040';

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&': { border: `2px solid ${base04}` },
    '.cm-cursor, .cm-dropCursor': { borderLeftWidth: '3px' },
    '.cm-fat-cursor': { backgroundColor: darkBlue, border: `2px solid ${base04}` },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { outline: `2px solid ${darkBlue}` },
    '.cm-searchMatch': { outline: `2px solid ${darkOrange}` },
    '.cm-searchMatch.cm-searchMatch-selected': { outline: `2px solid ${base04}` },
    '.cm-search.cm-panel.cm-textfield': { backgroundColor: base00, border: `2px solid ${base04}` },
    '.cm-panels': { border: `2px solid ${base04}` },
    '.cm-panels.cm-panels-top': { borderBottom: `2px solid ${base04}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `2px solid ${base04}` },
    '.cm-panel button': { border: `2px solid ${base04}` },
    '.cm-panel button:hover': { border: `2px solid ${darkBlue}` },
    '.cm-activeLine': { borderLeft: `3px solid ${darkBlue}`, borderRight: `1px solid ${base02}` },
    '.cm-gutters': { borderRight: `2px solid ${base04}` },
    '.cm-activeLineGutter': { fontWeight: 'bold', border: `1px solid ${base02}` },
    '.cm-insertedLine': { border: `2px solid ${darkGreen}` },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': { border: `2px solid ${darkGreen}` },
    '.cm-deletedLine': { border: `2px solid ${darkRed}` },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': { border: `2px solid ${darkRed}` },
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `2px solid ${darkBlue}`,
      boxShadow: null,
      color: base04,
    },
    '.cm-tooltip-autocomplete > ul': { border: `2px solid ${base04}` },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': { border: `2px solid ${darkBlue}` },
    '.cm-diagnostic-error': { borderLeft: `4px solid ${darkRed}`, backgroundColor: '#ff000020' },
    '.cm-diagnostic-warning': { borderLeft: `4px solid ${darkOrange}`, backgroundColor: '#ff990020' },
    '.cm-diagnostic-info': { borderLeft: `4px solid ${darkBlue}`, backgroundColor: `${darkBlue}20` },
    '.cm-lintPoint-error': { borderBottom: `3px wavy ${darkRed}` },
    '.cm-lintPoint-warning': { borderBottom: `3px wavy ${darkOrange}` },
    '.cm-matchingBracket': { outline: `2px solid ${darkCyan}` },
    '.cm-nonmatchingBracket': { outline: `2px solid ${darkRed}` },
    '.cm-selectionMatch': { outline: `2px solid ${darkBlue}50` },
    '.cm-foldPlaceholder': { border: `2px solid ${darkBlue}` },
    '&.cm-focused': { outline: `3px solid ${darkBlue}`, boxShadow: null, outlineOffset: '2px' },
    '& .cm-scroller::-webkit-scrollbar-track': { border: `2px solid ${base04}` },
    '& .cm-scroller::-webkit-scrollbar-thumb': { border: `2px solid ${base04}` },
    '.cm-ghostText': { opacity: '0.7' },
  },
  highlight: [
    { tag: [t.separator, t.definition(t.name)], color: darkBlue },
    { tag: [t.angleBracket, t.brace], color: darkCyan },
  ],
};

const theme = defineTheme({
  name: 'High Contrast Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base04,
    cursor: darkBlue,
    selection: '#4d90fe',
    activeLine: '#ffffccba',
    ghostText: base02,
    searchMatch: {
      background: '#ffff00',
      outline: darkOrange,
      foreground: base04,
      selectedBackground: darkOrange,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${darkBlue}50` },
    matchingBracket: { background: base01, outline: darkCyan },
    nonMatchingBracket: { background: '#ff000030', outline: darkRed },
    panel: {
      background: base00,
      foreground: base04,
      border: base04,
      buttonBackground: tooltipBackground,
      buttonForeground: darkBlue,
      buttonHoverBackground: base01,
    },
    gutter: {
      background: base00,
      foreground: base03,
      border: base04,
      activeBackground: base01,
      activeForeground: darkBlue,
      foldHover: darkCyan,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: darkBlue, border: darkBlue },
    tooltip: {
      background: darkBlue,
      border: darkBlue,
      listBackground: tooltipBackground,
      selectedBackground: selection,
      selectedForeground: base00,
      icon: darkCyan,
      detail: darkOrange,
      shadow: 'none',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: darkGreen,
      deletedBackground: removedBackground,
      deletedForeground: darkRed,
    },
    diagnostic: { error: darkRed, warning: darkOrange, info: darkBlue },
    scrollbar: { track: base00, thumb: base03, thumbHover: darkBlue },
    focusRing: 'none',
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
    operator: { color: darkCyan },
    punctuation: { color: base04 },
    bracket: { color: darkBrown },
    name: { color: base04 },
    localVariable: { color: darkOrange },
    variableDefinition: { color: darkOrange },
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
  migration,
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
