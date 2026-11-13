import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Tokyo Night Storm theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#24283b', // Background
  // const base01 = '#7982a9'; // Foreground
  base02 = '#414868', // Selection background
  base03 = '#96a1cf', // Comments, invisible
  base04 = '#c0caf5', // Default foreground (bright blue)
  base05 = '#282e44', // Dark background for panels
  base06 = '#1f2335', // Darker background (gutter)
  // Accent colors
  base07 = '#fb7991', // Errors, invalid
  base08 = '#ff9e64', // Numbers, constants
  base09 = '#e0af68', // Classes, attributes
  base0A = '#9ece6a', // Strings, success
  base0B = '#2ac3de', // Types, parameter
  base0C = '#7aa2f7', // Functions, properties
  base0D = '#bb9af7'; // Keywords, operators

// UI specific colors
const highlightBackground = '#292e427a', // Line highlight with transparency
  selection = '#6f7bb630', // Selection background with transparency
  selectionMatch = '#6f7bb650', // Selection match with transparency
  activeBracketBg = '#3d59a150'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80'; // Dark red with transparency for deletions

const theme = defineTheme({
  name: 'Tokyo Night Storm',
  dark: true,
  ui: {
    background: base00,
    foreground: base04,
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
    specialChar: base07,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 4px ${base0C}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base0C}40`,
      outline: base0C,
      foreground: base04,
      shadow: 'none',
      selectedBackground: base0C,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base0C}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base0C, shadow: 'none' },
    nonMatchingBracket: { background: `${base07}20`, outline: base07 },
    panel: {
      background: base05,
      foreground: base04,
      border: base03,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base05,
      buttonForeground: base04,
      buttonBorder: 'none',
      buttonHoverBackground: base06,
      buttonHoverForeground: base04,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base03}`,
    },
    gutter: {
      background: base06,
      foreground: base03,
      border: base06,
      activeBackground: base06,
      activeForeground: base04,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base04,
    },
    foldPlaceholder: { background: base05, foreground: base03, border: `${base03}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base05,
      foreground: base04,
      border: base03,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      listBackground: base05,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: base04,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0A,
      insertedBorder: `1px solid ${base0A}40`,
      deletedBackground: removedBackground,
      deletedForeground: base07,
      deletedBorder: `1px solid ${base07}40`,
    },
    diagnostic: {
      error: base07,
      warning: base08,
      info: base0B,
      hint: base0B,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base06,
      trackBorder: 'none',
      thumb: base02,
      thumbBorder: `3px solid ${base06}`,
      thumbHover: base03,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base05,
      borderColor: base03,
      buttonColor: base04,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: base0D, fontWeight: 'bold' },
    definitionKeyword: { color: base0D },
    modifier: { color: base08, fontStyle: 'italic' },
    separator: { color: base04 },
    operator: { color: base0D },
    punctuation: { color: base03 },
    name: { color: base04 },
    function: { color: base0C },
    self: { color: base08 },
    label: { color: base0C, fontStyle: 'italic' },
    property: { color: base0C, fontStyle: 'normal' },
    type: { color: base0B },
    typeDefinition: { color: base0B, fontWeight: 'bold' },
    className: { color: base09, fontStyle: 'italic' },
    namespace: { color: base0C, fontStyle: 'italic' },
    tag: { color: base0D },
    attribute: { color: base09 },
    content: { color: base04 },
    string: { color: base0A },
    regexp: { color: '#b4f9f8' },
    standardName: { color: base0D },
    number: { color: base08 },
    constant: { color: base08 },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base0A },
    annotation: { color: base07, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: '#89ddff' },
    headingLevel: { color: '#89ddff' },
    heading1: { color: '#89ddff', fontWeight: 'bold' },
    list: { color: '#89ddff' },
    quote: { color: base03 },
    monospace: { color: base04 },
    contentSeparator: { color: base0C },
    link: {
      color: base0D,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0B },
    strong: { fontWeight: 'bold', color: base04 },
    strikethrough: { color: base07, textDecoration: 'line-through' },
    invalid: { color: base04, textDecoration: 'underline wavy', borderBottom: `1px wavy ${base07}` },
    inserted: { color: base0A },
    deleted: { color: base07 },
    changed: { color: base08 },
  },
});

/**
 * Combined Tokyo Night Storm theme extension
 */
const tokyoNightStorm: Extension = theme.extension;

/**
 * Tokyo Night Storm merge revert styles configuration
 */
const tokyoNightStormMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, tokyoNightStorm, tokyoNightStormMergeStyles };
