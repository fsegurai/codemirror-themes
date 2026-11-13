import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced GitHub Light theme color palette
 * ----------------------------------------
 * Colors organized by function with visual color blocks for reference
 */

// Core UI colors
const base00 = '#ffffff', // Background (GitHub light mode background)
  base01 = '#24292e', // Foreground (main text color)
  base02 = '#BBDFFF', // Selection - light blue
  base03 = '#6a737d', // Comments, subdued text
  base04 = '#f6f8fa', // Light gray (gutter, panels)
  // Syntax highlighting colors
  base05 = '#116329', // Tag names - GitHub green
  base06 = '#58616b', // Comments, brackets - GitHub gray
  base07 = '#6f42c1', // Classes, properties - GitHub purple
  base08 = '#005cc5', // Variables, attributes - GitHub blue
  base09 = '#c10722', // Keywords, types - GitHub red
  base0A = '#032f62', // Strings, regexps - GitHub navy
  base0B = '#0e6f2a', // Names, quotes - GitHub green
  base0C = '#953800', // Atoms, booleans - GitHub orange
  // Background variants
  base0D = '#f1f8ff', // Active line gutter background
  base0E = '#e1e4e8', // Panel and tooltip border color
  base0F = '#f8f9fa'; // Tooltip background

// Special states
const invalid = '#bf1127', // Invalid color - error red
  highlightBackground = '#BBDFFF20', // Line highlight (light blue and opacity)
  activeBracketBg = '#e8f0fe', // Active bracket background
  activeBracketBorder = '#0366d6', // Active bracket border
  diagnosticWarning = '#b08800', // Warning color
  selectionMatch = '#79b8ff40', // Selection match background
  linkColor = '#035cc3', // Bright blue for links
  visitedLinkColor = '#743fcd'; // Purple for visited links

// Diff/merge specific colors
const addedBackground = '#e6ffec80', // GitHub light green with transparency
  removedBackground = '#ffebe980', // GitHub light red with transparency
  addedText = '#0f6d31'; // GitHub dark green for added text

const theme = defineTheme({
  name: 'GitHub Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base01,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base01}99`, border: 'none' },
    selection: base02,
    selectionInactive: base02,
    selectionForeground: base01,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: '#959da5',
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${linkColor}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#daebff',
      outline: base08,
      foreground: base01,
      shadow: 'none',
      selectedBackground: '#79b8ff',
      selectedForeground: base00,
      selectedOutline: `1px solid ${base08}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: `${activeBracketBorder}80`, shadow: 'none' },
    nonMatchingBracket: { background: '#ffeef080', outline: invalid },
    panel: {
      background: base04,
      foreground: base03,
      border: base0E,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base00,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: '#f5f5f5',
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base0E}`,
    },
    gutter: {
      background: base04,
      foreground: base03,
      border: base0E,
      activeBackground: base0D,
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: { background: selectionMatch, foreground: base03, border: `${base0E}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base0F,
      foreground: base01,
      border: base0E,
      shadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
      listBackground: base0F,
      listBorder: 'none',
      hoverBackground: `${activeBracketBorder}15`,
      selectedBackground: `${activeBracketBorder}30`,
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      insertedBorder: `1px solid ${addedText}30`,
      deletedBackground: removedBackground,
      deletedForeground: base09,
      deletedBorder: `1px solid ${base09}30`,
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
      track: base0E,
      trackBorder: 'none',
      thumb: base01,
      thumbBorder: `3px solid ${base0E}`,
      thumbHover: base06,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base0F,
      borderColor: base0E,
      buttonColor: base01,
      buttonHoverColor: '#f5f5f5',
    },
  },
  syntax: {
    keyword: { color: base09, fontWeight: 'bold' },
    definitionKeyword: { color: base09 },
    modifier: { color: base0C, fontStyle: 'italic' },
    functionDefinition: { color: base08 },
    operator: { color: base01 },
    punctuation: { color: base06 },
    name: { color: base08 },
    function: { color: base0B },
    self: { color: base0C },
    label: { color: base0B },
    property: { color: base07, fontStyle: 'normal' },
    type: { color: base09 },
    typeDefinition: { color: base09, fontWeight: 'bold' },
    className: { color: base07, fontStyle: 'italic' },
    namespace: { color: base08, fontStyle: 'italic' },
    tag: { color: base05 },
    attribute: { color: base07 },
    content: { color: base01 },
    string: { color: base0A },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base06 },
    meta: { color: base06 },
    processingInstruction: { color: base0B },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base08 },
    headingLevel: { color: base08 },
    quote: { color: base06 },
    monospace: { color: base01 },
    contentSeparator: { color: base08 },
    link: {
      color: visitedLinkColor,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: linkColor, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0A },
    strong: { fontWeight: 'bold', color: base08 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${invalid}`,
    },
    inserted: { color: base0B },
    deleted: { color: invalid },
    changed: { color: base0C },
  },
});

/**
 * Combined GitHub Light theme extension
 */
const githubLight: Extension = theme.extension;

/**
 * GitHub Light merge revert styles configuration
 */
const githubLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, githubLight, githubLightMergeStyles };
