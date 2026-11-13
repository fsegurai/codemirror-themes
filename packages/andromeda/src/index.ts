import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Andromeda theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#1b1e26', // Background (slightly darker for better contrast)
  base01 = '#e4dff0', // Foreground (slightly brighter for better readability)
  base02 = '#db45a270', // Selection and Selection Match (reduced opacity)
  base03 = '#2b303b', // Dropdown Background
  base04 = '#ffffff', // Cursor (pure white for better visibility)
  base05 = '#d667ff', // Keyword, Storage (brighter purple)
  base06 = '#24e3c3', // Variable, Parameter (slightly desaturated teal)
  base07 = '#ffdd80', // Function, Type, Class (warmer yellow)
  base08 = '#a6e07a', // String, RegExp (slightly muted green for better readability)
  base09 = '#ff7057', // Constant, Number (brighter orange-red)
  base0A = '#a8aab9', // Comment (higher contrast gray)
  base0B = '#ff40b3', // Heading (slightly desaturated magenta)
  base0C = '#fd3681', // Tag (adjusted pink)
  base0D = '#c7c7ff', // New color for brackets/punctuation
  base0E = '#6ae4b9', // New color for special elements
  base0F = '#3c94ff', // New color for attributes and links
  invalid = '#ff3162', // Invalid (more visible red)
  // UI-specific colors
  darkBackground = '#242830',
  highlightBackground = '#30343d40',
  tooltipBackground = '#1f232d', // Darker tooltip for better contrast
  activeBracketBg = '#db45a230',
  // Diff/merge specific colors
  addedBackground = '#0f3a2440', // Dark green with transparency for insertions
  removedBackground = '#78112230', // Dark red with transparency for deletions
  removedText = '#ff5d7a'; // Bright red for removed text

const theme = defineTheme({
  name: 'Andromeda',
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
    selectionForeground: base04,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base0A,
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base05}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: activeBracketBg,
      outline: `${base05}30`,
      foreground: base01,
      shadow: 'none',
      selectedBackground: '#db45a280',
      selectedForeground: base01,
      selectedOutline: `1px solid ${base05}30`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: '#db45a240', outline: `${base05}50` },
    matchingBracket: { background: activeBracketBg, outline: `${base05}50`, shadow: 'none' },
    nonMatchingBracket: { background: '#ff405030', outline: invalid },
    panel: {
      background: darkBackground,
      foreground: base06,
      border: '#3a3e4c',
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: darkBackground,
      buttonForeground: base06,
      buttonBorder: 'none',
      buttonHoverBackground: '#343946',
      buttonHoverForeground: base06,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: '1px solid #3a3e4c',
    },
    gutter: {
      background: darkBackground,
      foreground: '#748099',
      border: '#33384550',
      activeBackground: highlightBackground,
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
    },
    foldPlaceholder: { background: 'transparent', foreground: base02, border: `${base05}70` },
    tooltip: {
      background: tooltipBackground,
      foreground: base01,
      border: '#3a3e4c',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base03,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: '#db45a240',
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: '#748099',
      detail: '#748099',
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base08,
      insertedBorder: `1px solid ${base08}40`,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
      deletedBorder: `1px solid ${removedText}40`,
    },
    diagnostic: {
      error: invalid,
      warning: base07,
      info: base0F,
      hint: base0F,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: '#3b4151',
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: '#4e5568',
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: '#3a3e4c',
      buttonColor: base06,
      buttonHoverColor: '#343946',
    },
  },
  syntax: {
    keyword: { color: base05, fontWeight: 'bold' },
    definitionKeyword: { color: base05 },
    modifier: { color: base0F, fontStyle: 'italic' },
    functionDefinition: { color: base06 },
    operator: { color: base0D },
    punctuation: { color: base0D },
    name: { color: base06 },
    function: { color: base07 },
    self: { color: base09 },
    label: { color: base07 },
    property: { color: base06, fontStyle: 'normal' },
    type: { color: base07 },
    typeDefinition: { color: base07, fontWeight: 'bold' },
    className: { color: base07, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base0C },
    attribute: { color: base0F },
    content: { color: base01 },
    string: { color: base08 },
    number: { color: base09 },
    constant: { color: base09 },
    comment: { fontStyle: 'italic', color: base0A },
    meta: { color: base0A },
    processingInstruction: { color: base08 },
    annotation: { color: base0F, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base0B },
    list: { color: base0B },
    monospace: { color: base0B },
    contentSeparator: { color: base0B },
    link: {
      color: base0F,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0E, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0E },
    strong: { fontWeight: 'bold', color: base09 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: base08 },
    deleted: { color: invalid },
    changed: { color: base09 },
  },
});

/**
 * Combined Andromeda theme extension
 */
const andromeda: Extension = theme.extension;

/**
 * Andromeda merge revert styles configuration
 */
const andromedaMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { andromeda, andromedaMergeStyles, applyMergeRevertStyles };
