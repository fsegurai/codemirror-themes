import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced GitHub Dark theme color definitions
 * -------------------------------------------
 * Colors are organized by function with visual color blocks
 */

// Core UI colors
const base00 = '#0d1117', // Background (GitHub dark mode background)
  base01 = '#c9d1d9', // Foreground (main text color)
  base02 = '#264F78', // Selection - brighter blue for better visibility
  base03 = '#8b949e', // Comment and Bracket color
  base04 = '#ffffff', // Caret color (pure white for better visibility,
  // Syntax highlighting colors
  base05 = '#7ee787', // TagName, Name, Quote - signature GitHub green
  base06 = '#d2a8ff', // ClassName, PropertyName - GitHub purple
  base07 = '#79c0ff', // VariableName, Number - GitHub blue
  base08 = '#ff7b72', // Keyword, TypeName - GitHub red
  base09 = '#a5d6ff', // String, Meta, Regexp - lighter blue
  base0A = '#2c333a', // Panel button hover
  base0B = '#3c444d', // Deleted background color
  base0C = '#ffab70', // Atom, Bool - GitHub orange
  // Background variants
  base0D = '#161b22', // Gutter background (slightly darker than the editor)
  base0E = '#30363d', // Panel and tooltip border color
  base0F = '#21262d'; // Active line gutter background

// UI-specific colors
const invalid = '#f97583', // Invalid color - error red
  highlightBackground = '#2d333b1a', // Line highlight (GitHub selection color)
  activeBracketBg = '#3a587a75', // Active bracket background
  activeBracketBorder = '#4d90fe', // Active bracket border
  diagnosticWarning = '#d29922', // Warning color
  selectionMatch = '#3a587a55', // Selection match background
  linkColor = '#58a6ff', // Bright blue for links (GitHub link color)
  visitedLinkColor = '#bc8cff'; // Light purple for visited links

// Diff/merge specific colors
const addedBackground = '#2ea04350', // GitHub green with transparency
  removedBackground = '#f8514940'; // GitHub red with transparency

const theme = defineTheme({
  name: 'GitHub Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: base02,
    selectionInactive: base02,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${linkColor}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#3a587a',
      outline: base07,
      foreground: base01,
      shadow: 'none',
      selectedBackground: activeBracketBorder,
      selectedForeground: base04,
      selectedOutline: `1px solid ${base07}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: activeBracketBorder, shadow: 'none' },
    nonMatchingBracket: { background: `${invalid}40`, outline: invalid },
    panel: {
      background: base0F,
      foreground: base01,
      border: base0E,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base0F,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: base0A,
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base0E}`,
    },
    gutter: {
      background: base0D,
      foreground: base03,
      border: base0E,
      activeBackground: base0F,
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: { background: base0F, foreground: base03, border: `${base0E}70` },
    tooltip: {
      background: base0F,
      foreground: base01,
      border: base0E,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base0F,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: base04,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base05,
      insertedBorder: `1px solid ${base05}40`,
      deletedBackground: removedBackground,
      deletedForeground: base08,
      deletedBorder: `1px solid ${base08}40`,
    },
    diagnostic: {
      error: invalid,
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
      track: base0D,
      trackBorder: 'none',
      thumb: base0E,
      thumbBorder: `3px solid ${base0D}`,
      thumbHover: base0B,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base0F,
      borderColor: base0E,
      buttonColor: base01,
      buttonHoverColor: base0A,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: base0C, fontStyle: 'italic' },
    functionDefinition: { color: base07 },
    operator: { color: base01 },
    punctuation: { color: base03 },
    name: { color: base07 },
    function: { color: base05 },
    self: { color: base0C },
    label: { color: base05 },
    property: { color: base06, fontStyle: 'normal' },
    type: { color: base08 },
    typeDefinition: { color: base08, fontWeight: 'bold' },
    className: { color: base06, fontStyle: 'italic' },
    namespace: { color: base07, fontStyle: 'italic' },
    tag: { color: base05 },
    attribute: { color: base06 },
    content: { color: base01 },
    string: { color: base09 },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base05 },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base07 },
    headingLevel: { color: base07 },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base07 },
    link: {
      color: visitedLinkColor,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: linkColor, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base09 },
    strong: { fontWeight: 'bold', color: base07 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base05 },
    deleted: { color: invalid },
    changed: { color: base0C },
  },
});

/**
 * Combined GitHub Dark theme extension
 */
const githubDark: Extension = theme.extension;

/**
 * GitHub Dark merge revert styles configuration
 */
const githubDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, githubDark, githubDarkMergeStyles };
