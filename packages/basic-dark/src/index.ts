import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Basic Dark theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#1e2124', // Background (slightly darker for better contrast)
  base01 = '#e2e2e2', // Foreground (slightly brighter for better readability)
  base02 = '#5c88da', // Selection elements (more vibrant blue)
  base03 = '#b8b8b8', // Comments, line numbers (slightly lighter)
  base04 = '#ffffff', // Cursor (pure white for better visibility)
  base05 = '#e4e4e4', // Panels foreground
  base06 = '#a2a2a2', // Comments (slightly more visible gray)
  base07 = '#000000', // Pure black for contrast elements
  base08 = '#f47e86', // Error, deleted (more vibrant red)
  base09 = '#f39c12', // Number, boolean (warmer orange)
  base0A = '#ffcb6b', // Keywords (warmer yellow)
  base0B = '#98c379', // Strings (more vibrant green)
  base0C = '#56b6c2', // Classes, types (cyan blue)
  base0D = '#61afef', // Functions, methods (bright blue)
  base0E = '#d284e9', // Operators, brackets (brighter purple)
  base0F = '#f48073', // Special elements (darker red)
  // UI-specific colors
  darkBackground = '#252529', // Panel background (slightly darker)
  selectionBackground = '#3a5991aa', // Selection background (semi-transparent blue)
  highlightBackground = '#3a3d4166', // Active line background (subtle blue-gray)
  tooltipBackground = '#2a2c31', // Tooltip background (darker than the editor)
  activeBracketBg = '#3a599140',
  // Diff/merge specific colors
  addedBackground = '#1e462c50', // Dark green with transparency for insertions
  removedBackground = '#5c1e2340', // Dark red with transparency for deletions
  addedText = '#73c991', // Green for added text
  removedText = '#f07178'; // Red for removed text

const theme = defineTheme({
  name: 'Basic Dark',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base04,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base04}99`, border: 'none' },
    selection: '#3a59916f',
    selectionInactive: '#3a59916f',
    selectionForeground: base01,
    selectionOutline: 'none',
    activeLine: '#3a3d415f',
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base02}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#4a74c480',
      outline: base02,
      foreground: base01,
      shadow: 'none',
      selectedBackground: `${base02}90`,
      selectedForeground: base01,
      selectedOutline: `1px solid ${base02}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: '#4a74c440', outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: `${base0E}a0`, shadow: 'none' },
    nonMatchingBracket: { background: `${base08}40`, outline: base08 },
    panel: {
      background: darkBackground,
      foreground: base05,
      border: '#3a3a3a',
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: darkBackground,
      buttonForeground: base05,
      buttonBorder: 'none',
      buttonHoverBackground: '#35373d',
      buttonHoverForeground: base05,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: '1px solid #3a3a3a',
    },
    gutter: {
      background: darkBackground,
      foreground: base06,
      border: '#35383d',
      activeBackground: highlightBackground,
      activeForeground: base03,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: { background: 'transparent', foreground: base02, border: `${base02}70`, borderStyle: 'dotted' },
    tooltip: {
      background: tooltipBackground,
      foreground: base01,
      border: '#3a3a3a',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: selectionBackground,
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: base06,
      detail: base06,
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
      error: base08,
      warning: base0A,
      info: base0D,
      hint: base0D,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: '#444448',
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: '#55555a',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3a3a3a',
      buttonColor: base05,
      buttonHoverColor: '#35373d',
    },
  },
  syntax: {
    keyword: { color: base0A, fontWeight: 'bold' },
    definitionKeyword: { color: base0A },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base0E },
    punctuation: { color: base0E },
    name: { color: base0D },
    function: { color: base0D },
    self: { color: base09 },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base0C },
    typeDefinition: { color: base0C, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base0D, fontStyle: 'italic' },
    tag: { color: base0A },
    attribute: { color: base0D },
    content: { color: base01 },
    string: { color: base0B },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base06 },
    meta: { color: base08 },
    processingInstruction: { color: base0B },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0A },
    headingLevel: { color: base0A },
    list: { color: base0A },
    quote: { color: base06 },
    monospace: { color: base01 },
    contentSeparator: { color: base0D },
    link: {
      color: base0F,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0D },
    strong: { fontWeight: 'bold', color: base09, textShadow: `0 0 2px ${base07}` },
    strikethrough: { color: base08, textDecoration: 'line-through' },
    invalid: { color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base08}` },
    inserted: { color: base0B },
    deleted: { color: base08 },
    changed: { color: base09 },
  },
});

/**
 * Combined Basic Dark theme extension
 */
const basicDark: Extension = theme.extension;

/**
 * Basic Dark merge revert styles configuration
 */
const basicDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, basicDark, basicDarkMergeStyles };
