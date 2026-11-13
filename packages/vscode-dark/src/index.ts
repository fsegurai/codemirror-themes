import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced VSCode Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#1e1e1e', // Background
  base01 = '#252526', // Lighter background (popups, statuslines)
  base02 = '#2d2d30', // Selection background
  base03 = '#9f9f9f', // Comments, invisibles
  base04 = '#c6c6c6', // Cursor color
  base05 = '#d4d4d4', // Default foreground
  base06 = '#e9e9e9', // Light foreground
  base07 = '#1c1c1c', // Dark background (gutter)
  // Accent colors
  base08 = '#5fa5df', // Keywords, storage
  base09 = '#c98ac4', // Control keywords, operators
  base0A = '#9cdcfe', // Variables, parameters
  base0B = '#4ec9b0', // Classes, types
  base0C = '#dcdcaa', // Functions, attributes
  base0D = '#b5cea8', // Numbers, constants
  base0E = '#ce9178', // Strings
  base0F = '#fd746d', // Errors, invalid
  base10 = '#d7ba7d', // Modified elements
  base11 = '#7cac67'; // Comments

// UI specific colors
const highlightBackground = '#FFFFFF08', // Line highlight with transparency
  selection = '#264f7889', // Selection background with transparency
  selectionMatch = '#72a1ff59', // Selection match background with transparency
  activeBracketBg = '#ffffff15', // Active bracket background with transparency
  linkColor = '#54a1fd'; // Link color

// Diff/merge specific colors
const addedBackground = '#1e3f1e80', // Dark green with transparency for insertions
  removedBackground = '#4b1c1c80', // Dark red with transparency for deletions
  addedText = '#6cc26f', // VS Code green for added text
  removedText = '#f14c4c'; // VS Code red for removed text

const theme = defineTheme({
  name: 'VSCode Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base0F,
    focusRing: `0 0 0 2px ${base03}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#72a1ff40',
      outline: `${base08}90`,
      foreground: base06,
      shadow: 'none',
      selectedBackground: `${linkColor}90`,
      selectedForeground: base06,
      selectedOutline: `1px solid ${base08}99`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}70` },
    matchingBracket: { background: activeBracketBg, outline: `${base08}99`, shadow: 'none' },
    nonMatchingBracket: { background: `${base0F}40`, outline: base0F },
    panel: {
      background: base01,
      foreground: base05,
      border: base02,
      borderWidth: '1px',
      outline: 'none',
      shadow: '0 2px 6px rgba(0, 0, 0, 0.45)',
      buttonBackground: base02,
      buttonForeground: base05,
      buttonBorder: `1px solid ${base02}`,
      buttonHoverBackground: '#3a3a3a',
      buttonHoverForeground: base05,
      buttonHoverBorder: `1px solid ${base03}80`,
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base02}`,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base02,
      activeBackground: highlightBackground,
      activeForeground: base06,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base06,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base05,
      border: base02,
      shadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: '#04395e',
      selectedForeground: base06,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      insertedBorder: `1px solid ${addedText}40`,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
      deletedBorder: `1px solid ${removedText}40`,
    },
    diagnostic: {
      error: base0F,
      warning: base10,
      info: linkColor,
      hint: linkColor,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base00,
      trackBorder: 'none',
      thumb: '#424242',
      thumbBorder: `3px solid ${base00}`,
      thumbHover: '#525252',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base01,
      borderColor: base02,
      buttonColor: base05,
      buttonHoverColor: '#3a3a3a',
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
    nameDefinition: { color: base05 },
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
    content: { color: base05 },
    string: { color: base0E },
    regexp: { color: '#eb807f' },
    constantName: { color: base0A },
    standardName: { color: base0A },
    null: { color: base0D },
    number: { color: base0D },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base11 },
    meta: { color: base03 },
    processingInstruction: { color: base0E },
    annotation: { color: base10, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    headingLevel: { color: base08 },
    heading1: { color: base08, fontWeight: 'bold' },
    list: { color: base08 },
    quote: { color: base11 },
    monospace: { color: base05 },
    link: { color: base09, textDecoration: 'underline', textUnderlinePosition: 'under' },
    url: { color: linkColor, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base08 },
    strikethrough: { color: base0F, textDecoration: 'line-through' },
    invalid: { color: base05, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base0F}` },
    inserted: { color: base0E },
    deleted: { color: base0F },
    changed: { color: base10 },
  },
});

/**
 * Combined VSCode Dark theme extension
 */
const vsCodeDark: Extension = theme.extension;

/**
 * VS Code Dark merge revert styles configuration
 */
const vsCodeDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, vsCodeDark, vsCodeDarkMergeStyles };
