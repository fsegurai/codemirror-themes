import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Tokyo Night Day theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#e1e2e7', // Background
  base01 = '#3760bf', // Primary foreground
  base02 = '#99a7df', // Selection background
  base03 = '#848cb5', // Comments, invisibles
  base04 = '#8c91a8', // Dark foreground (status)
  base06 = '#e9e9ec', // Light background
  base07 = '#d5d6db', // Light background (gutter)
  // Accent colors
  base_red = '#f52a65', // Errors, invalid
  base_orange = '#b15c00', // Numbers, constants
  base_yellow = '#8c6c3e', // Classes, attributes
  base_green = '#587539', // Strings, success
  base_cyan = '#007197', // Functions, keywords
  base_blue = '#2e7de9', // Variables, parameters
  base_purple = '#7847bd', // Operators, tags
  base_magenta = '#9854f1'; // Special characters

// UI specific colors
const highlightBackground = '#5F5FAF5A', // Line highlight with improved transparency
  selection = '#99a7df40', // Selection background with transparency
  selectionMatch = '#99a7df60', // Selection match with transparency
  activeBracketBg = '#0e639c20'; // Active bracket background with transparency

// Diff/merge specific colors
const addedBackground = '#58753920', // Green with transparency for insertions
  removedBackground = '#f52a6520'; // Red with transparency for deletions

const theme = defineTheme({
  name: 'Tokyo Night Day',
  dark: false,
  ui: {
    background: base00,
    foreground: base01,
    border: 'none',
    cursor: base01,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base01}99`, border: 'none' },
    selection: selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: base_red,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${base_cyan}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: '#0e639c40',
      outline: base_cyan,
      foreground: base01,
      shadow: 'none',
      selectedBackground: base_cyan,
      selectedForeground: base00,
      selectedOutline: `1px solid ${base_cyan}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: base_cyan, shadow: 'none' },
    nonMatchingBracket: { background: removedBackground, outline: base_red },
    panel: {
      background: base06,
      foreground: base01,
      border: `${base03}30`,
      borderWidth: '1px',
      outline: 'none',
      shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      buttonBackground: base06,
      buttonForeground: base01,
      buttonBorder: 'none',
      buttonHoverBackground: base07,
      buttonHoverForeground: base01,
      buttonHoverBorder: `1px solid ${base02}`,
      buttonHoverShadow: 'none',
      inputBackground: base00,
      inputBorder: `1px solid ${base03}30`,
    },
    gutter: {
      background: base07,
      foreground: base03,
      border: base07,
      activeForeground: base01,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base01,
      activeBackground: base06,
    },
    foldPlaceholder: { background: base06, foreground: base03, border: `${base03}70` },
    tooltip: {
      background: base06,
      foreground: base01,
      border: `${base04}40`,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: base06,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: base03,
      detail: base03,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base_green,
      insertedBorder: `1px solid ${base_green}40`,
      deletedBackground: removedBackground,
      deletedForeground: base_red,
      deletedBorder: `1px solid ${base_red}40`,
    },
    diagnostic: {
      error: base_red,
      warning: base_orange,
      info: base_cyan,
      hint: base_cyan,
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
      backgroundColor: base07,
      borderColor: base03,
      buttonColor: base01,
      buttonHoverColor: selectionMatch,
    },
  },
  syntax: {
    keyword: { color: base_cyan, fontWeight: 'bold' },
    definitionKeyword: { color: base_cyan },
    modifier: { color: base_orange, fontStyle: 'italic' },
    separator: { color: base_blue },
    operator: { color: base_purple },
    punctuation: { color: base03 },
    name: { color: base_blue },
    variable: { color: base01 },
    localVariable: { color: base_blue },
    variableDefinition: { color: base_blue },
    function: { color: base_cyan },
    self: { color: base_orange },
    label: { color: base_purple, fontStyle: 'italic' },
    property: { color: base_blue, fontStyle: 'normal' },
    type: { color: base_cyan },
    typeDefinition: { color: base_cyan, fontWeight: 'bold' },
    className: { color: base_yellow, fontStyle: 'italic' },
    namespace: { color: base_purple, fontStyle: 'italic' },
    tag: { color: base_purple },
    attribute: { color: base_yellow },
    content: { color: base01 },
    string: { color: base_green },
    regexp: { color: base_magenta },
    number: { color: base_orange },
    constant: { color: base_orange },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: base_green },
    annotation: { color: base_red, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base_orange },
    headingLevel: { color: base_cyan },
    heading1: { color: base_orange, fontWeight: 'bold' },
    heading2: { color: base_orange },
    heading3: { color: base_orange },
    list: { color: base_orange },
    quote: { color: base03 },
    monospace: { color: base01 },
    contentSeparator: { color: base_blue },
    link: {
      color: base_purple,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base_cyan, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base_green },
    strong: { fontWeight: 'bold', color: base01 },
    strikethrough: { color: base_red, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${base_red}`,
    },
    inserted: { color: base_green },
    deleted: { color: base_red },
    changed: { color: base_orange },
  },
});

/**
 * Combined Tokyo Night Day theme extension
 */
const tokyoNightDay: Extension = theme.extension;

/**
 * Tokyo Night Day merge revert styles configuration
 */
const tokyoNightDayMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, tokyoNightDay, tokyoNightDayMergeStyles };
