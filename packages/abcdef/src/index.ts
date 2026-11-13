import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

// Enhanced Abcdef theme colors with improved contrast and harmony
const base00 = '#0a0e14', // Background (slightly deeper for better contrast)
  base01 = '#e0edff', // Foreground (slightly bluer tint for better readability)
  base02 = '#3a4a5f', // Selection (richer blue tone)
  base03 = '#242936', // Gutter background (distinguished from selection)
  base04 = '#d8e1f0', // Gutter foreground (softer white)
  base05 = '#4fc1ff', // Caret (bright cyan blue for visibility)
  base06 = '#3a4a5f40', // Line highlight with balanced opacity
  base07 = '#1a2030', // Dark background for panels
  base08 = '#efbb24', // Keyword (warm gold instead of darkgoldenrod)
  base09 = '#7799ff', // Atom (brighter blue)
  base0A = '#919498', // Comment (slightly bluer gray)
  base0B = '#c792ea', // Number (softer purple)
  base0C = '#ffee99', // Definition, Function (softer yellow)
  base0D = '#abcdef', // Variable (keeping the theme's signature color)
  base0E = '#ffcc44', // Type Name (warmer yellow)
  base0F = '#99c2ff', // Tag Name (light blue)
  // UI elements
  invalid = '#fa5c74', // Invalid color (more visible red)
  tooltipBackground = '#0f1521', // Darker tooltip for better contrast
  selectionForeground = '#ffffff', // Selection text color
  activeBracketBg = '#3a4a5f60', // Active bracket background
  // Diff/merge specific colors
  addedBackground = '#1d391d4d', // Dark green for insertions
  removedBackground = '#391d1d08', // Dark red for deletions
  addedText = '#7aecb3', // Bright mint green for added text
  removedText = '#ff8a80'; // Soft red for removed text

const theme = defineTheme({
  name: 'Abcdef',
  dark: true,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base05,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base05}99`, border: 'none' },
    selection: '#1e2d41',
    selectionInactive: '#1e2d41',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: base06,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base04,
    ghostTextOpacity: '0.5',
    specialChar: invalid,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base0D}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base0F}40`,
      outline: base0F,
      foreground: selectionForeground,
      shadow: 'none',
      selectedBackground: '#38465b63',
      selectedForeground: selectionForeground,
      selectedOutline: `3px solid ${base0F}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: base06, outline: base0D },
    matchingBracket: { background: activeBracketBg, outline: base0D, shadow: 'none' },
    nonMatchingBracket: { background: base06, outline: base0D },
    panel: {
      background: base07,
      foreground: base04,
      border: '#1c2838',
      borderWidth: '2px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base02,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: '#4a5a6f',
      buttonHoverForeground: base01,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: '1px solid #1c2838',
    },
    gutter: {
      background: base03,
      foreground: base04,
      activeBackground: base06,
      activeForeground: selectionForeground,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base0D,
      border: '#1c2838',
    },
    foldPlaceholder: { background: base06, foreground: base0D, border: base0D, borderStyle: 'dotted' },
    tooltip: {
      background: tooltipBackground,
      foreground: base01,
      border: base02,
      shadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      selectedBackground: base02,
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: base0D,
      detail: base0A,
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
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
      error: invalid,
      warning: base08,
      info: base05,
      hint: base05,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base07,
      trackBorder: 'none',
      thumb: `${base02}AA`,
      thumbBorder: `3px solid ${base07}`,
      thumbHover: base02,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base03,
      borderColor: base02,
      buttonColor: selectionForeground,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base08, fontWeight: 'bold' },
    definitionKeyword: { color: base08 },
    modifier: { color: '#ffad5c', fontStyle: 'italic' },
    operator: { color: '#ff9cac' },
    punctuation: { color: '#d0d6e0' },
    name: { color: base09 },
    localVariable: { color: base0C },
    variableDefinition: { color: base0C },
    nameDefinition: { color: base09 },
    function: { color: base0C },
    self: { color: base0B },
    label: { color: '#ffad5c' },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base0E },
    typeDefinition: { color: base0E, fontWeight: 'bold' },
    className: { color: base0D, fontStyle: 'italic' },
    namespace: { color: '#78a0d3', opacity: 0.8 },
    tag: { color: base0F },
    attribute: { color: '#ffad5c' },
    content: { color: base01 },
    string: { color: addedText },
    regexp: { color: '#6acdbe' },
    number: { color: base0B },
    constant: { color: base0B },
    comment: { fontStyle: 'italic', color: base0A },
    meta: { color: '#78a0d3' },
    processingInstruction: { color: addedText },
    annotation: { color: '#ffad5c', fontStyle: 'italic' },
    heading: { color: base0E, fontWeight: 'bold' },
    headingLevel: { color: base0E },
    list: { color: base0E },
    monospace: { color: base0E },
    contentSeparator: { color: base0E },
    link: { color: base0E, fontWeight: '500' },
    url: { color: '#66c2ff', textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic' },
    strong: { fontWeight: 'bold' },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: { color: invalid, textDecoration: 'underline wavy' },
    inserted: { color: addedText },
    deleted: { color: invalid },
    changed: { color: '#ff9cac' },
  },
});

/**
 * Combined Abcdef theme extension
 */
const abcdef: Extension = theme.extension;

/**
 * Abcdef merge revert styles configuration
 */
const abcdefMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { abcdef, abcdefMergeStyles, applyMergeRevertStyles };
