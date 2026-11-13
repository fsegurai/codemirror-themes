import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Material Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff', // Background - pure white for clean look
  base01 = '#f5f5f5', // Lighter background (popups, statuslines)
  base02 = '#212121', // Main text - nearly black for contrast
  base03 = '#676767', // Comments, invisibles - gray 600
  base04 = '#9e9e9e', // Cursor and line numbers - gray 500
  base05 = '#424242', // Default foreground - gray 800
  base06 = '#eeeeee', // Light borders or divisions - gray 200
  base07 = '#fafafa', // Light background (gutter) - gray 50
  // Accent colors - using standard Material Design palette
  base08 = '#ce0f0e', // Red 500
  base09 = '#c22f06', // Deep Orange 500
  base0A = '#b719a7ff', // Pink 500
  base0B = '#ffc107', // Amber 500 (better than yellow for light theme)
  base0C = '#95590e', // Orange 500
  base0D = '#15717f', // Cyan 600 (better contrast for light theme)
  base0E = '#3949ab', // Indigo 600 (better contrast for light theme)
  base0F = '#8e24aa', // Purple 600 (better contrast for light theme)
  base10 = '#0d771c', // Green 600 (better contrast for light theme)
  base11 = '#0b7468', // Teal 600 (better contrast for light theme)
  base12 = '#0c69b6'; // Blue 600 (better contrast for light theme)

// UI specific colors
const highlightBackground = '#00000008', // Line highlight
  selection = '#d7e8f9', // Selection background
  selectionMatch = '#90a4ae26', // Selection match background
  activeBracketBg = '#DDEEFF80', // Active bracket background
  hoverHighlight = '#ECEFF180'; // Hover highlight

// Diff/merge specific colors
const addedBackground = '#e6ffed80', // Light green with transparency for insertions
  removedBackground = '#ffebe980', // Light red with transparency for deletions
  addedText = '#28a745', // Bright green for added text
  removedText = '#d73a49'; // Bright red for removed text

const theme = defineTheme({
  name: 'Material Light',
  dark: false,
  ui: {
    background: base00,
    foreground: base02,
    border: 'none',
    cursor: '#8f8f8f',
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base02}99`, border: 'none' },
    selection: selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base08,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base0D}`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#FFA72680',
      outline: base0B,
      foreground: base02,
      shadow: 'none',
      selectedBackground: base0D,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base0B}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base03}30` },
    matchingBracket: { background: activeBracketBg, outline: base0D, shadow: 'none' },
    nonMatchingBracket: { background: `${base08}20`, outline: base08 },
    panel: {
      background: base06,
      foreground: base02,
      border: base04,
      borderWidth: '1px',
      outline: 'none',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      buttonBackground: base01,
      buttonForeground: base02,
      buttonBorder: 'none',
      buttonHoverBackground: '#CFD8DC',
      buttonHoverForeground: base02,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base04}`,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base04,
      activeBackground: '#E0E0E0',
      activeForeground: base02,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base02,
    },
    foldPlaceholder: { background: base01, foreground: base03, border: `${base03}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base02,
      border: base04,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: hoverHighlight,
      selectedBackground: hoverHighlight,
      selectedForeground: base02,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: addedText,
      insertedBorder: `1px solid ${addedText}30`,
      deletedBackground: removedBackground,
      deletedForeground: removedText,
      deletedBorder: `1px solid ${removedText}30`,
    },
    diagnostic: {
      error: base08,
      warning: base0C,
      info: base0D,
      hint: base0D,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base07,
      trackBorder: 'none',
      thumb: base03,
      thumbBorder: `3px solid ${base07}`,
      thumbHover: base02,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base01,
      borderColor: base04,
      buttonColor: base02,
      buttonHoverColor: '#CFD8DC',
    },
  },
  syntax: {
    keyword: { color: base0D, fontWeight: 'bold' },
    definitionKeyword: { color: base0D },
    modifier: { color: base0C, fontStyle: 'italic' },
    separator: { color: base0A },
    operator: { color: base0E },
    punctuation: { color: base03 },
    bracket: { color: base0F },
    angleBracket: { color: base02 },
    squareBracket: { color: base08 },
    name: { color: base05 },
    localVariable: { color: base0A },
    variableDefinition: { color: base0A },
    function: { color: base09 },
    self: { color: base0C },
    label: { color: base12, fontStyle: 'italic' },
    property: { color: base11, fontStyle: 'normal' },
    type: { color: base0C },
    typeDefinition: { color: base0A, fontWeight: 'bold' },
    className: { color: base0C, fontStyle: 'italic' },
    namespace: { color: base0E, fontStyle: 'italic' },
    tag: { color: base09 },
    attribute: { color: base05 },
    content: { color: base02 },
    string: { color: base10 },
    regexp: { color: base0A },
    atom: { color: base0F },
    constantName: { color: base09 },
    specialVariable: { color: base05 },
    number: { color: base0C },
    constant: { color: base0C },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base10 },
    annotation: { color: base08, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base11 },
    headingLevel: { color: base12 },
    heading5: { color: base0F },
    heading2: { color: base0C },
    heading3: { color: base0D },
    heading4: { color: base0E },
    heading6: { color: base10 },
    list: { color: base11 },
    monospace: { color: base02 },
    contentSeparator: { color: base0D },
    link: {
      color: base0F,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0D, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0C },
    strong: { fontWeight: 'bold', color: base0E },
    strikethrough: { color: base08, textDecoration: 'line-through' },
    invalid: {
      color: base02,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base08}`,
    },
    inserted: { color: base10 },
    deleted: { color: base08 },
    changed: { color: base0C },
  },
});

/**
 * Combined Material Light theme extension
 */
const materialLight: Extension = theme.extension;

/**
 * Material Light merge revert styles configuration
 */
const materialLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, materialLight, materialLightMergeStyles };
