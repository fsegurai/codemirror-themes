import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

// Base colors derived from the original CM5 Material Ocean theme
const base00 = '#0F111A', // Background
  base01 = '#151825', // Slightly lighter background (popups, statuslines)
  base02 = 'rgba(113, 124, 180, 0.2)', // Selection background
  base03 = '#464B5D', // Comments, invisibles, line highlighting, gutter
  base04 = '#FFCC00', // Cursor
  base05 = '#8F93A2', // Default foreground
  base06 = '#EEFFFF', // Light foreground
  // Accent colors (token colors)
  base08 = '#C792EA', // Keywords, attributes, properties
  base09 = '#89DDFF', // Operators
  base0A = '#FFCB6B', // Builtins, meta
  base0B = '#C3E88D', // Strings
  base0C = '#F78C6C', // Atoms
  base0D = '#82AAFF', // Definitions
  base0E = '#FF5370', // Numbers, tags, errors
  base0F = '#DECB6B', // Types, qualifiers
  base10 = '#f07178', // Variable-3, string-2
  base11 = '#80CBC4'; // Selection variant / aqua tint

// UI specific colors
const highlightBackground = 'rgba(0, 0, 0, 0.5)', // Active line
  selectionMatch = 'rgba(128, 203, 196, 0.2)',
  activeBracketBg = '#39496650';

// Diff/merge specific colors – tuned to match the palette
const addedBackground = '#13343a80',
  removedBackground = '#3b1c2480';

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '.cm-fat-cursor': { backgroundColor: `${base04}75` },
  },
  highlight: [
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0A },
    { tag: [t.null, t.heading4], color: base0E },
    { tag: t.definition(t.name), color: base10 },
    { tag: t.heading2, color: base0C },
    { tag: t.heading3, color: base0D },
    { tag: t.heading5, color: base0F },
    { tag: t.heading6, color: base08 },
  ],
};

const theme = defineTheme({
  name: 'Material Ocean',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    cursor: base04,
    selection: base02,
    activeLine: highlightBackground,
    ghostText: base03,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base09}40`,
    searchMatch: {
      background: '#394966cc',
      outline: base09,
      foreground: base06,
      selectedBackground: base09,
      selectedForeground: base00,
    },
    selectionMatch: { background: selectionMatch, outline: base02 },
    matchingBracket: { background: activeBracketBg, outline: base0D },
    nonMatchingBracket: { background: '#ff537055', outline: base0E },
    panel: {
      background: base00,
      foreground: base05,
      border: base03,
      buttonBackground: base01,
      buttonForeground: base05,
      buttonHoverBackground: base02,
    },
    gutter: {
      background: base00,
      foreground: base03,
      border: base03,
      activeBackground: '#151823',
      activeForeground: base05,
      foldHover: base05,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      selectedBackground: base02,
      selectedForeground: base06,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base11,
      deletedBackground: removedBackground,
      deletedForeground: base0E,
    },
    diagnostic: { error: base0E, warning: base0A, info: base0D },
    scrollbar: { track: base00, thumb: base03, thumbHover: base05 },
    merge: {
      backgroundColor: base01,
      borderColor: base03,
      buttonColor: base06,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base0A, fontStyle: 'italic' },
    operator: { color: base09 },
    punctuation: { color: base03 },
    name: { color: base10 },
    localVariable: { color: base0D },
    variableDefinition: { color: base0D },
    function: { color: base0D },
    self: { color: base0C },
    label: { color: base0D, fontStyle: 'italic' },
    property: { color: base08, fontStyle: 'normal' },
    type: { color: base0F },
    typeDefinition: { color: base0F, fontWeight: 'bold' },
    className: { color: base0F, fontStyle: 'italic' },
    namespace: { color: base08, fontStyle: 'italic' },
    tag: { color: base0E },
    attribute: { color: base08 },
    string: { color: base0B },
    regexp: { color: base0C },
    number: { color: base0E },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base11 },
    annotation: { color: base0E, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base11 },
    headingLevel: { color: base0B },
    list: { color: base11 },
    quote: { color: base03 },
    monospace: { color: base05 },
    contentSeparator: { color: base08 },
    link: {
      color: base08,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0D, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base08 },
    strikethrough: { color: base0E, textDecoration: 'line-through' },
    invalid: { color: base06, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0E}` },
    inserted: { color: base11 },
    deleted: { color: base0E },
    changed: { color: base0E },
  },
  migration,
});

/**
 * Combined Material Ocean theme extension
 */
const materialOcean: Extension = theme.extension;

/**
 * Material Ocean merge revert styles configuration
 */
const materialOceanMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, materialOcean, materialOceanMergeStyles };
