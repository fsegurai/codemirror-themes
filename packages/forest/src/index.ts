import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';

import { defineTheme, type ThemeMigration } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Forest theme color palette
 * -----------------------------------
 * Colors organized by natural forest elements with visual color blocks for reference
 */

// Core natural elements
const base00 = '#1a2a33'; // Background - deeper forest shade for better contrast
const base01 = '#d0d8e0'; // Foreground - clearer moonlight for better readability
// const base02 = '#2d3c44'; // Selection - dark forest floor, more defined
const base03 = '#607d8b'; // Comments - silvery bark gray, more legible

// Flora elements (accent colors)
const base04 = '#c594c5'; // Cursor - forest wildflower
const base05 = '#a9d3ab'; // Keywords - lighter, fresher leaf green
const base06 = '#4db6ac'; // Variables - clearer water reflection
const base07 = '#78aadc'; // Functions - brighter dusk sky
const base08 = '#ef5350'; // Strings - vibrant woodland berries
const base09 = '#bc8f6a'; // Numbers - rich forest soil
const base0A = '#ffb74d'; // Classes - golden sunlight through canopy
const base0B = '#9ccc65'; // Properties - fresh moss
const base0C = '#4dd0e1'; // Special chars - forest stream
const base0D = '#7986cb'; // Tags - morning mist
const base0E = '#ba68c8'; // Operators - purple wildflowers
// const base0F = '#f57f17'; // Metadata - autumn leaves

// UI-specific colors
const invalid = '#ff5252'; // Error highlight - warning red berry
const darkBackground = '#233039'; // Panel background - shadowy forest
const highlightBackground = '#314443aa'; // Active line - forest clearing with dappled light
const tooltipBackground = '#2a3b42'; // Tooltip background - darker canopy shadow
const selection = '#2c5a3acc'; // Selection - translucent forest green
const selectionMatch = '#5d482faa'; // Selection match - amber forest light
const lineNumbers = '#607d8b90'; // Line numbers - faded tree bark
const activeBracketBg = '#2c5a3a80'; // Active bracket - forest green

// Diff/merge specific colors
const addedBackground = '#28513a80', // Forest green with transparency for insertions
  removedBackground = '#763c3c70'; // Deep red with transparency for deletions

/**
 * TEMPORARY: differences between the canonical structure and this theme's pre-6.31 output, kept so the move onto
 * `defineTheme` changes nothing visually. To be removed when the theme is completed on the shared structure.
 */
const migration: ThemeMigration = {
  ui: {
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { color: base01 },
    '.cm-panels': { borderRadius: '0 0 4px 4px' },
  },
  highlight: [
    { tag: [t.color, t.standard(t.name)], color: base09, fontWeight: 'bold' },
    { tag: t.definition(t.name), color: base06 },
    { tag: [t.heading5, t.heading6], color: base0A },
  ],
};

const theme = defineTheme({
  name: 'Forest',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    cursor: base04,
    selection: selection,
    activeLine: highlightBackground,
    ghostText: '#8fa7b5',
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base0A}40`,
    searchMatch: {
      background: '#4d653b80',
      outline: `${base0A}90`,
      foreground: base01,
      selectedBackground: '#42855c',
      selectedForeground: base01,
    },
    selectionMatch: { background: selectionMatch, outline: `${base0A}40` },
    matchingBracket: { background: activeBracketBg, outline: `${base0A}80` },
    nonMatchingBracket: { background: '#5d482f80', outline: `${invalid}80` },
    panel: {
      background: darkBackground,
      foreground: base01,
      border: '#3e5059',
      buttonBackground: darkBackground,
      buttonForeground: base01,
      buttonHoverBackground: '#2d3d47',
    },
    gutter: {
      background: darkBackground,
      foreground: lineNumbers,
      border: '#3e505980',
      activeBackground: highlightBackground,
      activeForeground: base01,
      foldHover: base01,
    },
    foldPlaceholder: { background: 'transparent', foreground: base03, border: `${base0A}70` },
    tooltip: {
      background: tooltipBackground,
      border: '#3e5059',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: tooltipBackground,
      selectedBackground: selection,
      selectedForeground: base01,
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0B,
      deletedBackground: removedBackground,
      deletedForeground: base08,
    },
    diagnostic: { error: invalid, warning: base0A, info: base0C },
    scrollbar: { track: darkBackground, thumb: '#3e5059', thumbHover: '#4e616a' },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3e5059',
      buttonColor: base01,
      buttonHoverColor: '#2d3d47',
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base0E },
    name: { color: base06 },
    localVariable: { color: base07 },
    variableDefinition: { color: base07 },
    function: { color: base07 },
    self: { color: base09 },
    label: { color: base07 },
    property: { color: base0B, fontStyle: 'normal' },
    type: { color: base0A },
    typeDefinition: { color: base0A, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base06, fontStyle: 'italic' },
    tag: { color: base0D },
    attribute: { color: base0C },
    string: { color: base08 },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base08 },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0A },
    list: { color: base0A },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base0C },
    link: {
      color: base0A,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0C, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base06 },
    strong: { fontWeight: 'bold', color: base05 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base08 },
    deleted: { color: invalid },
    changed: { color: base09 },
  },
  migration,
});

/**
 * Combined Forest theme extension
 */
const forest: Extension = theme.extension;

/**
 * Forest merge revert styles configuration
 */
const forestMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, forest, forestMergeStyles };
