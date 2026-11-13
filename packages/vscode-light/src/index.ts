import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced VSCode Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff', // Background
  base01 = '#f3f3f3', // Lighter background (popups, statuslines)
  base02 = '#d6d6d6', // Selection background
  base03 = '#6b6b6b', // Comments, invisibles
  base04 = '#000000', // Cursor color
  base05 = '#383a42', // Default foreground
  base06 = '#1f1f1f', // Dark foreground
  base07 = '#f5f5f5', // Light background (gutter)
  // Accent colors
  base08 = '#0064ff', // Keywords, storage
  base09 = '#af00db', // Control keywords, operators
  base0A = '#0070c1', // Variables, parameters
  base0B = '#267f99', // Classes, types
  base0C = '#795e26', // Functions, attributes
  base0D = '#098658', // Numbers, constants
  base0E = '#a31515', // Strings
  base0F = '#e51400', // Errors, invalid
  base11 = '#008000'; // Comments

// UI specific colors
const highlightBackground = '#99999926', // Line highlight with transparency
  selection = '#add6ff', // Selection background
  selectionMatch = '#a8ac9480', // Selection match background with transparency
  activeBracketBg = '#007acc20', // Active bracket background with transparency
  activeBracketBorder = '#007acc', // Active bracket border
  diagnosticWarning = '#bf8803', // Warning color
  linkColor = '#006ab1', // Link color
  visitedLinkColor = '#9e46d0'; // Visited link color

// Diff/merge specific colors
const addedBackground = '#ddfbe0', // Light green with transparency for insertions
  removedBackground = '#ffebec', // Light red with transparency for deletions
  addedText = '#22863a'; // VS Code Light green for added text

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-searchMatch span': { color: null },
    '.cm-panels': { borderRadius: '3px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' },
    '.cm-panel button': { border: `1px solid ${base02}` },
    '.cm-panel button:hover': { border: `1px solid ${base03}80` },
    '.cm-tooltip-autocomplete > ul': { maxHeight: '300px' },
  },
  highlight: [
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0A },
    { tag: t.null, color: base0D },
    { tag: t.definition(t.name), color: base05 },
    { tag: t.heading1, color: base08, fontWeight: 'bold' },
  ],
};

const theme = defineTheme({
  name: 'VSCode Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base05,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 1px ${base02}`,
    searchMatch: {
      background: '#bbdefb',
      outline: `${base0A}90`,
      foreground: base06,
      selectedBackground: '#90caf9',
      selectedForeground: base06,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}70` },
    matchingBracket: { background: activeBracketBg, outline: `${activeBracketBorder}80` },
    nonMatchingBracket: { background: `${base0F}20`, outline: base0F },
    panel: {
      background: base01,
      foreground: base05,
      border: base02,
      buttonBackground: base00,
      buttonForeground: base05,
      buttonHoverBackground: '#e8e8e8',
    },
    gutter: {
      background: base07,
      foreground: '#237893',
      border: base02,
      activeBackground: highlightBackground,
      activeForeground: '#0b216f',
      foldHover: '#0b216f',
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      border: base02,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base01,
      selectedBackground: '#dcebfc',
      selectedForeground: base06,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      deletedBackground: removedBackground,
      deletedForeground: base0F,
    },
    diagnostic: { error: base0F, warning: diagnosticWarning, info: linkColor },
    scrollbar: { track: base00, thumb: '#dadada', thumbHover: '#cccccc' },
    merge: {
      backgroundColor: base01,
      borderColor: base02,
      buttonColor: base05,
      buttonHoverColor: '#e8e8e8',
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    controlKeyword: { color: base09, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base08, fontStyle: 'normal' },
    operator: { color: base05 },
    punctuation: { color: base05 },
    name: { color: base05 },
    variable: { color: base0A },
    function: { color: base0C },
    self: { color: base08 },
    label: { color: base0C, fontStyle: 'normal' },
    property: { color: base0A, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0B, fontStyle: 'normal' },
    namespace: { color: base05, fontStyle: 'normal' },
    tag: { color: base08 },
    attribute: { color: base0A },
    string: { color: base0E },
    regexp: { color: base09 },
    number: { color: base0D },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base11 },
    meta: { color: base03 },
    processingInstruction: { color: base0E },
    annotation: { color: base0C, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    headingLevel: { color: base08 },
    list: { color: base08 },
    quote: { color: base11 },
    monospace: { color: base05 },
    link: {
      color: visitedLinkColor,
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: linkColor, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0A },
    strong: { fontWeight: 'bold', color: base08 },
    strikethrough: { color: base0F, textDecoration: 'line-through' },
    invalid: { color: base05, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0F}` },
    inserted: { color: base0E },
    deleted: { color: base0F },
    changed: { color: base0C },
  },
  migration,
});

/**
 * Combined VSCode Light theme extension
 */
const vsCodeLight: Extension = theme.extension;

/**
 * VS Code Light merge revert styles configuration
 */
const vsCodeLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, vsCodeLight, vsCodeLightMergeStyles };
