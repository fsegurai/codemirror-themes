import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Cobalt2 theme color palette
 * ---------------------------------------------------------------------
 * Colors are organized by function with visual color blocks for quick reference
 */

// Base colors from the original Cobalt2 theme (exact match)
const background = '#193549', // Main editor background
  foreground = '#fff', // Main text color (exact from original)
  cursor = '#ffc600', // Cursor color (bright yellow)
  selection = '#0050A4', // Selection background
  selectionInactive = '#003b8b', // Inactive selection
  selectionHighlight = '#0050A480', // Selection highlights (with transparency)
  lineHighlight = '#99eeff33', // The current line highlights
  // UI backgrounds (exact from original)
  darkBackground = '#122738', // Sidebar, panels, gutter
  panelBackground = '#15232d', // Panel background
  gutterBackground = '#12273866', // Gutter background with transparency
  // Searches and finds colors (exact from original)
  findMatchCurrent = '#FF720066', // Currently found item
  findMatchOther = '#CAD40F66', // Other found items
  hoverHighlight = '#ffc60033', // Hover highlight
  // Word highlights (exact from original)
  wordHighlight = '#ffffff21', // Word highlight background
  // Accent colors from tokenColors (exact from original)
  blue = '#0088ff', // Comments, links
  cyan = '#80fcff', // Special keywords, module exports
  lightBlue = '#9effff', // Meta, variables, properties
  orange = '#ff9d00', // Keywords, support functions
  pink = '#ff628c', // Constants, deleted text
  hotPink = '#fb94ff', // Language variables, storage.type.function
  lightPink = '#FF68B8', // Types, interfaces (semantic)
  green = '#3ad900', // Template strings
  lightGreen = '#a5ff90', // Regular strings, markup inserted
  red = '#f44542', // Invalid, errors
  errorRed = '#A22929', // Error foreground
  // Additional colors from the original palette
  gray = '#aaa', // Comments, secondary text
  lightGray = '#e1efff', // Punctuation, variables
  darkGray = '#0d3a58', // Borders, inactive elements
  parameterYellow = '#ffee80', // Parameters, template expressions
  stringQuotes = '#92fc79', // String quotes (special)
  supportTeal = '#80ffbb'; // Support classes, TypeScript types

// Diff/merge specific colors (exact from original)
const addedBackground = '#3ad90033', // Light green with transparency for insertions
  removedBackground = '#ee3a4333'; // Light red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { color: foreground },
    '.cm-searchMatch span': { color: null },
    '.cm-searchMatch.cm-searchMatch-selected': { padding: null },
    '.cm-searchMatch.cm-searchMatch-selected span': { color: null },
    '.cm-search.cm-panel.cm-textfield': { backgroundColor: background, border: `1px solid ${darkGray}` },
    '.cm-panels': { color: gray },
    '.cm-panel button': { border: `1px solid ${darkGray}` },
    '.cm-panel button:hover': { color: foreground },
    '.cm-activeLine': { zIndex: null },
    '.cm-lineNumbers': { color: gray },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': { border: `1px solid ${lightGreen}30` },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': { border: `1px solid ${pink}30` },
    '.cm-tooltip': { color: gray },
    '.cm-tooltip-autocomplete > ul > li': { color: gray },
    '.cm-tooltip .cm-tooltip-arrow:before': { borderTopColor: null, borderBottomColor: null },
    '.cm-tooltip .cm-tooltip-arrow:after': { borderTopColor: null, borderBottomColor: null },
    '.cm-selectionMatch': { outline: null },
    '&.cm-focused': { boxShadow: null },
    '.cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selection}DD`,
      border: `1px solid ${cyan}40`,
      borderRadius: '2px',
    },
    '&.cm-focused .cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selection}FF`,
      border: `1px solid ${cyan}60`,
      boxShadow: `0 0 3px ${cyan}30`,
    },
    '&:not(.cm-focused) .cm-selectionBackground': { backgroundColor: selectionInactive },
    '&:not(.cm-focused) .cm-activeLine .cm-selectionBackground': {
      backgroundColor: `${selectionInactive}CC`,
      border: `1px solid ${darkGray}80`,
    },
    '.cm-hoverHighlight': { backgroundColor: hoverHighlight },
    '.cm-wordHighlight': { backgroundColor: wordHighlight, borderRadius: '2px' },
    '.cm-specialChar': { color: '#ffffff52' },
    '.cm-indentGuide': { borderLeft: '1px solid #3B5364' },
  },
  highlight: [
    { tag: t.macroName, color: lightPink, fontStyle: 'italic' },
    { tag: [t.color, t.definition(t.name)] },
    { tag: [t.special(t.keyword), t.special(t.variableName), t.special(t.propertyName)], color: cyan },
    { tag: t.character, color: lightGreen },
    { tag: [t.paren, t.function(t.propertyName)], color: cursor },
    { tag: [t.standard(t.propertyName), t.standard(t.tagName)], color: supportTeal },
    { tag: [t.special(t.string), t.special(t.monospace), t.special(t.character)], color: green },
    { tag: t.definition(t.function(t.variableName)), color: parameterYellow },
    { tag: t.definition(t.function(t.propertyName)), color: lightBlue },
  ],
};

const theme = defineTheme({
  name: 'Cobalt2',
  dark: true,
  ui: {
    background: background,
    foreground: foreground,
    cursor: cursor,
    selection: selection,
    activeLine: lineHighlight,
    ghostText: gray,
    searchMatch: {
      background: findMatchCurrent,
      outline: orange,
      foreground: foreground,
      selectedBackground: findMatchOther,
      selectedForeground: foreground,
    },
    selectionMatch: { background: selectionHighlight, outline: selectionHighlight },
    matchingBracket: { background: darkGray, outline: `${cursor}80` },
    nonMatchingBracket: { background: `${errorRed}20`, outline: errorRed },
    panel: {
      background: darkBackground,
      foreground: cursor,
      border: cursor,
      buttonBackground: blue,
      buttonForeground: foreground,
      buttonHoverBackground: orange,
    },
    gutter: {
      background: gutterBackground,
      foreground: gray,
      border: darkGray,
      activeBackground: 'transparent',
      activeForeground: foreground,
      foldHover: cursor,
    },
    foldPlaceholder: { background: 'transparent', foreground: gray, border: `${blue}50` },
    tooltip: {
      background: panelBackground,
      border: darkGray,
      shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      listBackground: panelBackground,
      selectedBackground: background,
      selectedForeground: cursor,
      icon: blue,
      detail: gray,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: lightGreen,
      deletedBackground: removedBackground,
      deletedForeground: pink,
    },
    diagnostic: { error: errorRed, warning: cursor, info: blue },
    scrollbar: { track: darkBackground, thumb: '#406179cc', thumbHover: '#437da3cc' },
    focusRing: 'none',
    merge: {
      backgroundColor: panelBackground,
      borderColor: darkGray,
      buttonColor: gray,
      buttonHoverColor: darkGray,
    },
  },
  syntax: {
    keyword: { color: orange },
    moduleKeyword: { color: cyan },
    definitionKeyword: { color: hotPink },
    operatorKeyword: { color: orange },
    modifier: { color: cursor, fontStyle: 'italic' },
    operator: { color: lightGray },
    punctuation: { color: lightGray },
    name: {},
    variable: { color: foreground },
    function: { color: cursor },
    self: { color: hotPink },
    label: { color: cursor },
    property: { color: lightBlue },
    type: { color: lightPink, fontStyle: 'italic' },
    tag: { color: lightBlue },
    attribute: { color: cursor, fontStyle: 'italic' },
    string: { color: lightGreen },
    escape: { color: cursor },
    number: { color: pink },
    unit: { color: parameterYellow },
    constant: { color: pink },
    comment: { color: blue, fontStyle: 'italic' },
    meta: { color: lightBlue },
    processingInstruction: { color: cursor },
    annotation: { color: cursor, fontStyle: 'italic' },
    heading: { color: cursor, fontWeight: 'bold' },
    list: { color: cursor },
    quote: { color: stringQuotes },
    monospace: { color: lightBlue },
    contentSeparator: { color: cursor },
    link: { color: blue },
    url: { color: lightBlue },
    emphasis: { color: lightBlue, fontStyle: 'italic' },
    strong: { color: lightBlue, fontWeight: 'bold' },
    strikethrough: { color: gray, textDecoration: 'line-through' },
    invalid: { color: red },
    inserted: { color: lightGreen },
    deleted: { color: pink },
    changed: { color: cursor },
  },
  migration,
});

/**
 * Combined Cobalt2 theme extension
 */
const cobalt2: Extension = theme.extension;

/**
 * Cobalt2 merge revert styles configuration
 */
const cobalt2MergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, cobalt2, cobalt2MergeStyles };
