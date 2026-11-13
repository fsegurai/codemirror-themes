import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Android Studio theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#282b2e', // Background (authentic IntelliJ IDEA dark theme)
  base01 = '#a9b7c6', // Foreground (standard text)
  base02 = '#3f3f3f', // Selection background (slightly darker for contrast)
  base03 = '#3b3b3b', // Gutter background (slightly lighter than the main background)
  base04 = '#989b9e', // Line numbers (slightly darker for less distraction)
  // Language syntax colors
  base05 = '#e58f4b', // Keywords (signature orange)
  base06 = '#79a8cd', // Numbers, constants (signature blue)
  base07 = '#b996cc', // Variables (improved purple)
  base08 = '#a3a3a3', // Comments (authentic gray)
  base09 = '#bbb529', // Meta, annotations (yellow-green)
  base0A = '#8dac7c', // Strings (signature green)
  base0B = '#ffc66d', // Class names, types (warmer gold)
  base0D = '#7bb16d', // Function names, docs (forest green)
  base0E = '#d0d0ff', // Brackets, special constructs (soft purple)
  base0F = '#e8bf6a', // Tags (amber)
  base10 = '#68a7eb', // Links (blue)
  base11 = '#5fb566', // URLs (green)
  // UI-specific colors
  invalid = '#fb7d76', // Error highlighting (more visible)
  cursor = '#ffffff', // Cursor color
  selectionBackground = '#2e5280', // Stronger selection background
  highlightBackground = '#323232', // Active line highlight
  gutterBackground = '#313335', // Gutter background
  activeBracketBg = '#3b514d',
  activeBracketBorder = '#43705c',
  // Diff/merge specific colors
  addedBackground = '#294436', // Dark green for insertions, matching IntelliJ
  removedBackground = '#484a4a'; // Dark gray/red for deletions

const theme = defineTheme({
  name: 'Android Studio',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: cursor,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${cursor}99`, border: 'none' },
    selection: '#173a66',
    selectionInactive: '#173a66',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: `${highlightBackground}21`,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: '#a9a9a9',
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base02}, 0 0 0 4px ${base00}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#32593d',
      outline: cursor,
      foreground: cursor,
      shadow: 'none',
      selectedBackground: '#375580',
      selectedForeground: cursor,
      selectedOutline: `1px solid ${cursor}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: '#32593d40', outline: base0D },
    matchingBracket: { background: activeBracketBg, outline: activeBracketBorder, shadow: 'none' },
    nonMatchingBracket: { background: '#53383e', outline: invalid },
    panel: {
      background: gutterBackground,
      foreground: base01,
      border: '#5b5b5b',
      borderWidth: '2px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: gutterBackground,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: '#404040',
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: '1px solid #5b5b5b',
    },
    gutter: {
      background: gutterBackground,
      foreground: base04,
      border: base02,
      activeBackground: highlightBackground,
      activeForeground: '#c0c0c0',
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: { background: base03, foreground: '#a1a1a1', border: base04, borderStyle: 'dotted' },
    tooltip: {
      background: base03,
      foreground: base01,
      border: '#5b5b5b',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      selectedBackground: selectionBackground,
      selectedForeground: cursor,
      selectedBorder: 'none',
      icon: base04,
      detail: base04,
      listBackground: base03,
      listBorder: 'none',
      hoverBackground: 'transparent',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      insertedBorder: `1px solid ${base0A}40`,
      deletedBackground: removedBackground,
      deletedForeground: base05,
      deletedBorder: `1px solid ${base05}40`,
    },
    diagnostic: {
      error: invalid,
      warning: base0F,
      info: base0D,
      hint: base0D,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: gutterBackground,
      trackBorder: 'none',
      thumb: '#5a5a5a',
      thumbBorder: `3px solid ${gutterBackground}`,
      thumbHover: '#6e6e6e',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: gutterBackground,
      borderColor: '#5b5b5b',
      buttonColor: base01,
      buttonHoverColor: '#414141',
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base09, fontStyle: 'italic' },
    operator: { color: base05 },
    punctuation: { color: base01 },
    bracket: { color: base0E },
    brace: { color: base01 },
    functionDefinition: { color: base07 },
    name: { color: base07 },
    function: { color: base01 },
    self: { color: base05 },
    label: { color: base0D },
    property: { color: base0A, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base0B, fontStyle: 'italic' },
    namespace: { color: base07, fontStyle: 'italic' },
    tag: { color: base0F },
    attribute: { color: base01 },
    content: { color: base01 },
    string: { color: base0A },
    number: { color: base06 },
    constant: { color: base06 },
    comment: { fontStyle: 'italic', color: base08 },
    docComment: { fontStyle: 'italic', color: base0D },
    meta: { color: base08 },
    processingInstruction: { color: base0A },
    atom: { color: base05 },
    specialVariable: { color: base05 },
    annotation: { color: base09, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base0B },
    list: { color: base0B },
    monospace: { color: base0B },
    contentSeparator: { color: base0B },
    link: { color: base10, fontWeight: '500' },
    url: { color: base11, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base0A },
    deleted: { color: invalid },
    changed: { color: base06 },
  },
});

/**
 * Combined Android Studio theme extension
 */
const androidStudio: Extension = theme.extension;

/**
 * Android Studio merge revert styles configuration
 */
const androidStudioMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { androidStudio, androidStudioMergeStyles, applyMergeRevertStyles };
