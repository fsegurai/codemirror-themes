import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
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

const theme = defineTheme({
  name: 'VSCode Light',
  dark: false,
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
    focusRing: `0 0 0 1px ${base02}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#bbdefb',
      outline: `${base0A}90`,
      foreground: base06,
      shadow: 'none',
      selectedBackground: '#90caf9',
      selectedForeground: base06,
      selectedOutline: `1px solid ${base0A}90`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}70` },
    matchingBracket: { background: activeBracketBg, outline: `${activeBracketBorder}80`, shadow: 'none' },
    nonMatchingBracket: { background: `${base0F}20`, outline: base0F },
    panel: {
      background: base01,
      foreground: base05,
      border: base02,
      borderWidth: '1px',
      outline: 'none',
      shadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      buttonBackground: base00,
      buttonForeground: base05,
      buttonBorder: `1px solid ${base02}`,
      buttonHoverBackground: '#e8e8e8',
      buttonHoverForeground: base05,
      buttonHoverBorder: `1px solid ${base03}80`,
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base02}`,
    },
    gutter: {
      background: base07,
      foreground: '#237893',
      border: base02,
      activeBackground: highlightBackground,
      activeForeground: '#0b216f',
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: '#0b216f',
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base01,
      foreground: base05,
      border: base02,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: '#dcebfc',
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
      deletedForeground: base0F,
      deletedBorder: `1px solid ${base0F}40`,
    },
    diagnostic: {
      error: base0F,
      warning: diagnosticWarning,
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
      thumb: '#dadada',
      thumbBorder: `3px solid ${base00}`,
      thumbHover: '#cccccc',
      thumbHoverShadow: 'none',
    },
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
    regexp: { color: base09 },
    constantName: { color: base0A },
    standardName: { color: base0A },
    null: { color: base0D },
    number: { color: base0D },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base11 },
    meta: { color: base03 },
    processingInstruction: { color: base0E },
    annotation: { color: base0C, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    headingLevel: { color: base08 },
    heading1: { color: base08, fontWeight: 'bold' },
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
