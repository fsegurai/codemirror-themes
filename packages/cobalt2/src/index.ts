import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
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
  selection = '#09478e', // Selection background
  selectionInactive = '#003b8b', // Inactive selection
  selectionHighlight = '#0050A480', // Selection highlights (with transparency)
  lineHighlight = '#99eeff0d', // The current line highlights
  // UI backgrounds (exact from original)
  darkBackground = '#122738', // Sidebar, panels, gutter
  panelBackground = '#15232d', // Panel background
  gutterBackground = '#12273866', // Gutter background with transparency
  // Searches and finds colors (exact from original)
  findMatchCurrent = '#FF720066', // Currently found item
  findMatchOther = '#CAD40F66', // Other found items
  // Accent colors from tokenColors (exact from original)
  blue = '#83bafe', // Comments, links
  cyan = '#80fcff', // Special keywords, module exports
  lightBlue = '#9effff', // Meta, variables, properties
  orange = '#fea22f', // Keywords, support functions
  pink = '#fb9caf', // Constants, deleted text
  hotPink = '#fb94ff', // Language variables, storage.type.function
  lightPink = '#fb99c8', // Types, interfaces (semantic)
  green = '#3ad900', // Template strings
  lightGreen = '#a5ff90', // Regular strings, markup inserted
  red = '#ff9d93', // Invalid, errors
  errorRed = '#A22929', // Error foreground
  // Additional colors from the original palette
  gray = '#b7b7b7', // Comments, secondary text
  lightGray = '#e1efff', // Punctuation, variables
  darkGray = '#0d3a58', // Borders, inactive elements
  parameterYellow = '#ffee80', // Parameters, template expressions
  stringQuotes = '#92fc79', // String quotes (special)
  supportTeal = '#80ffbb'; // Support classes, TypeScript types

// Diff/merge specific colors (exact from original)
const addedBackground = '#3ad90033', // Light green with transparency for insertions
  removedBackground = '#ee3a4333'; // Light red with transparency for deletions

const theme = defineTheme({
  name: 'Cobalt2',
  dark: true,
  ui: {
    background: background,
    foreground: foreground,
    border: 'none',
    cursor: cursor,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${cursor}99`, border: 'none' },
    selection: selection,
    selectionInactive: selectionInactive,
    selectionForeground: foreground,
    selectionOutline: 'none',
    activeLine: lineHighlight,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: gray,
    ghostTextOpacity: '0.5',
    specialChar: '#ffffff52',
    searchMatch: {
      background: findMatchCurrent,
      outline: orange,
      foreground: foreground,
      shadow: 'none',
      selectedBackground: findMatchOther,
      selectedForeground: foreground,
      selectedOutline: `1px solid ${orange}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionHighlight, outline: `${cyan}40` },
    matchingBracket: { background: darkGray, outline: `${cursor}88`, shadow: 'none' },
    nonMatchingBracket: { background: `${errorRed}20`, outline: errorRed },
    panel: {
      background: darkBackground,
      foreground: gray,
      border: cursor,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: blue,
      buttonForeground: foreground,
      buttonBorder: `1px solid ${darkGray}`,
      buttonHoverBackground: orange,
      buttonHoverForeground: foreground,
      buttonHoverBorder: `1px solid ${darkGray}`,
      buttonHoverShadow: 'none',
      inputBackground: background,
      inputBorder: `1px solid ${darkGray}`,
    },
    gutter: {
      background: gutterBackground,
      foreground: gray,
      border: darkGray,
      activeBackground: 'transparent',
      activeForeground: foreground,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: cursor,
    },
    foldPlaceholder: { background: 'transparent', foreground: gray, border: `${blue}50`, borderStyle: 'dotted' },
    tooltip: {
      background: panelBackground,
      foreground: gray,
      border: darkGray,
      shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      listBackground: panelBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: background,
      selectedForeground: cursor,
      selectedBorder: 'none',
      icon: blue,
      detail: gray,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: lightGreen,
      insertedBorder: `1px solid ${lightGreen}30`,
      deletedBackground: removedBackground,
      deletedForeground: pink,
      deletedBorder: `1px solid ${pink}30`,
    },
    diagnostic: {
      error: errorRed,
      warning: cursor,
      info: blue,
      hint: blue,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: '#406179cc',
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: '#437da3cc',
      thumbHoverShadow: 'none',
    },
    focusRing: `0 0 0 2px ${background}, 0 0 0 4px ${cyan}`,
    outlineWidth: '1px',
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
    character: { color: lightGreen },
    macroName: { color: lightPink, fontStyle: 'italic' },
    paren: { color: cursor },
    operator: { color: lightGray },
    punctuation: { color: lightGray },
    name: {},
    variable: { color: foreground },
    nameDefinition: {},
    functionDefinition: { color: parameterYellow },
    function: { color: cursor },
    self: { color: hotPink },
    label: { color: cursor },
    specialProperty: { color: cyan },
    method: { color: cursor },
    standardTag: { color: supportTeal },
    methodDefinition: { color: lightBlue },
    property: { color: lightBlue },
    type: { color: lightPink, fontStyle: 'italic' },
    tag: { color: lightBlue },
    attribute: { color: cursor, fontStyle: 'italic' },
    content: { color: foreground },
    string: { color: lightGreen },
    escape: { color: cursor },
    number: { color: pink },
    unit: { color: parameterYellow },
    color: {},
    specialVariable: { color: cyan },
    constant: { color: pink },
    comment: { color: blue, fontStyle: 'italic' },
    meta: { color: lightBlue },
    processingInstruction: { color: cursor },
    specialString: { color: green },
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
