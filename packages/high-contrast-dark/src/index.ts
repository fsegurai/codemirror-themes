import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
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
  base03 = '#808080', // Comments - medium grey
  base04 = '#b0b0b0', // Dark grey
  base05 = '#ffffff', // Foreground - pure white
  // High contrast accent colors
  brightYellow = '#ffff00',
  brightCyan = '#00ffff',
  brightGreen = '#00ff00',
  brightRed = '#ff0000',
  brightMagenta = '#ff00ff',
  brightBlue = '#0099ff',
  brightOrange = '#ff9900',
  brightPurple = '#cc66ff';

// UI specific colors
const tooltipBackground = '#1a1a1a',
  selection = '#264f78',
  selectionMatch = '#264f7880';

// Diff/merge specific colors
const addedBackground = '#00550060',
  removedBackground = '#55000060';

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&': { border: `1px solid ${base04}` },
    '.cm-cursor, .cm-dropCursor': { borderLeftWidth: '3px' },
    '.cm-fat-cursor': { backgroundColor: brightYellow, border: `2px solid ${base05}` },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { outline: `2px solid ${brightCyan}` },
    '.cm-searchMatch': { outline: `2px solid ${brightGreen}` },
    '.cm-searchMatch.cm-searchMatch-selected': { outline: `2px solid ${base05}` },
    '.cm-search.cm-panel.cm-textfield': { backgroundColor: base01, border: `1px solid ${base04}` },
    '.cm-panels': { border: `1px solid ${base04}` },
    '.cm-panels.cm-panels-top': { borderBottom: `2px solid ${base04}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `2px solid ${base04}` },
    '.cm-panel button': { border: `1px solid ${base04}` },
    '.cm-panel button:hover': { border: `1px solid ${brightCyan}` },
    '.cm-activeLine': { borderLeft: `3px solid ${brightCyan}`, borderRight: `1px solid ${base04}` },
    '.cm-gutters': { borderRight: `2px solid ${base04}` },
    '.cm-activeLineGutter': { fontWeight: 'bold', border: `1px solid ${base03}` },
    '.cm-insertedLine': { border: `1px solid ${brightGreen}` },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': { border: `1px solid ${brightGreen}` },
    '.cm-deletedLine': { border: `1px solid ${brightRed}` },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': { border: `1px solid ${brightRed}` },
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `2px solid ${brightCyan}`,
      boxShadow: null,
      color: base05,
    },
    '.cm-tooltip-autocomplete > ul': { border: `1px solid ${base04}` },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': { border: `1px solid ${brightCyan}` },
    '.cm-diagnostic-error': { borderLeft: `4px solid ${brightRed}`, backgroundColor: '#33000020' },
    '.cm-diagnostic-warning': { borderLeft: `4px solid ${brightYellow}`, backgroundColor: '#33330020' },
    '.cm-diagnostic-info': { borderLeft: `4px solid ${brightCyan}`, backgroundColor: '#00333320' },
    '.cm-lintPoint-error': { borderBottom: `3px wavy ${brightRed}` },
    '.cm-lintPoint-warning': { borderBottom: `3px wavy ${brightYellow}` },
    '.cm-matchingBracket': { outline: `2px solid ${brightCyan}` },
    '.cm-nonmatchingBracket': { outline: `2px solid ${brightRed}` },
    '.cm-selectionMatch': { outline: `2px solid ${brightCyan}50` },
    '.cm-foldPlaceholder': { border: `2px solid ${brightCyan}` },
    '&.cm-focused': { outline: `3px solid ${brightCyan}`, boxShadow: null, outlineOffset: '2px' },
    '& .cm-scroller::-webkit-scrollbar-track': { border: `1px solid ${base04}` },
    '& .cm-scroller::-webkit-scrollbar-thumb': { border: `2px solid ${base05}` },
    '.cm-ghostText': { opacity: '0.7' },
  },
  highlight: [{ tag: [t.separator, t.definition(t.name), t.angleBracket, t.brace], color: brightCyan }],
};

const theme = defineTheme({
  name: 'High Contrast Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    cursor: brightYellow,
    selection: '#3a5a8a',
    activeLine: '#2a2a2aa6',
    ghostText: base03,
    searchMatch: {
      background: '#006400',
      outline: brightGreen,
      foreground: base05,
      selectedBackground: brightGreen,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: `${brightCyan}50` },
    matchingBracket: { background: base02, outline: brightCyan },
    nonMatchingBracket: { background: '#33000050', outline: brightRed },
    panel: {
      background: base00,
      foreground: base05,
      border: base04,
      buttonBackground: tooltipBackground,
      buttonForeground: brightCyan,
      buttonHoverBackground: base02,
    },
    gutter: {
      background: base00,
      foreground: base04,
      border: base04,
      activeBackground: base02,
      activeForeground: brightYellow,
      foldHover: brightCyan,
    },
    foldPlaceholder: { background: tooltipBackground, foreground: brightCyan, border: brightCyan },
    tooltip: {
      background: brightCyan,
      border: brightCyan,
      listBackground: tooltipBackground,
      selectedBackground: selection,
      selectedForeground: brightYellow,
      icon: brightCyan,
      detail: brightYellow,
      shadow: 'none',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: brightGreen,
      deletedBackground: removedBackground,
      deletedForeground: brightRed,
    },
    diagnostic: { error: brightRed, warning: brightYellow, info: brightCyan },
    scrollbar: { track: base00, thumb: base04, thumbHover: brightCyan },
    focusRing: 'none',
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
    operator: { color: brightCyan },
    punctuation: { color: base05 },
    bracket: { color: brightYellow },
    name: { color: base05 },
    localVariable: { color: brightOrange },
    variableDefinition: { color: brightOrange },
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
  migration,
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
