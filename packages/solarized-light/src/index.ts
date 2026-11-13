import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Enhanced Solarized Light theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#50656d', // Body text/default text color
  base01 = '#4d6269', // Optional emphasized content
  base02 = '#073642', // Background highlights
  base03 = '#002b36', // Comments, invisible, line highlighting
  base04 = '#dfd9c8', // Dark background tint
  base05 = '#93a1a1', // Default foreground/UI text color
  base06 = '#cceeff7a', // Light background tint (for selection)
  base07 = '#fdf6e3', // Background - light base
  base08 = '#eee8d5', // Background tint - light secondary
  // Accent colors from Solarized palette
  base09 = '#c40e18', // Red
  base0A = '#af3a03', // Orange
  base0B = '#7c5d05', // Yellow
  base0C = '#5a6804', // Green
  base0D = '#0c6e68', // Cyan
  base0E = '#0a66a1', // Blue
  base0F = '#565aaa', // Violet
  base10 = '#ba166e'; // Magenta

// UI specific colors
const invalid = '#c50f0a', // Bright red for errors
  tooltipBackground = '#f0e9d7', // Tooltip background
  selection = '#ffd07a', // Selection background
  selectionMatch = '#e1dbca90', // Selection match with opacity
  activeBracketBg = '#93a1a140'; // Active bracket background with opacity

// Diff/merge specific colors
const addedBackground = '#85990020', // Solarized green with transparency for insertions
  removedBackground = '#dc322f20'; // Solarized red with transparency for deletions

const theme = defineTheme({
  name: 'Solarized Light',
  dark: false,
  ui: {
    background: base07,
    foreground: base00,
    border: 'none',
    cursor: base01,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${base01}99`, border: 'none' },
    selection: '#fed996',
    selectionInactive: '#fed996',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: base06,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base01,
    ghostTextOpacity: '0.5',
    specialChar: base09,
    focusRing: `0 0 0 2px ${base07}, 0 0 0 3px ${base0E}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${base05}80`,
      outline: base0E,
      foreground: base01,
      shadow: 'none',
      selectedBackground: base0E,
      selectedForeground: base08,
      selectedOutline: `1px solid ${base0E}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: selectionMatch, outline: `${base05}50` },
    matchingBracket: { background: activeBracketBg, outline: base0E, shadow: 'none' },
    nonMatchingBracket: { background: `${base09}40`, outline: invalid },
    panel: {
      background: base04,
      foreground: base00,
      border: base04,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: tooltipBackground,
      buttonForeground: base00,
      buttonBorder: 'none',
      buttonHoverBackground: base06,
      buttonHoverForeground: base00,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base07,
      inputBorder: `1px solid ${base04}`,
    },
    gutter: {
      background: base04,
      foreground: base01,
      border: base04,
      activeBackground: base06,
      activeForeground: base00,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: base00,
    },
    foldPlaceholder: {
      background: tooltipBackground,
      foreground: base03,
      border: `${base05}70`,
      borderStyle: 'dotted',
    },
    tooltip: {
      background: tooltipBackground,
      foreground: base00,
      border: base01,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: selection,
      selectedForeground: base01,
      selectedBorder: 'none',
      icon: base01,
      detail: base01,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: base0C,
      insertedBorder: `1px solid ${base0C}40`,
      deletedBackground: removedBackground,
      deletedForeground: base09,
      deletedBorder: `1px solid ${base09}40`,
    },
    diagnostic: {
      error: base09,
      warning: base0B,
      info: base0E,
      hint: base0E,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base04,
      trackBorder: 'none',
      thumb: base04,
      thumbBorder: `3px solid ${base04}`,
      thumbHover: base05,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: base04,
      borderColor: base02,
      buttonColor: base0D,
      buttonHoverColor: activeBracketBg,
    },
  },
  syntax: {
    keyword: { color: base0C, fontWeight: 'bold' },
    definitionKeyword: { color: base0C },
    modifier: { color: base10, fontStyle: 'italic' },
    separator: { color: base0D },
    operator: { color: base0F },
    punctuation: { color: base01 },
    bracket: { color: base10 },
    angleBracket: { color: base01 },
    squareBracket: { color: base09 },
    name: { color: base0D },
    variable: { color: base00 },
    localVariable: { color: base0D },
    variableDefinition: { color: base0D },
    function: { color: base0E },
    self: { color: base10 },
    label: { color: base10 },
    property: { color: base0D, fontStyle: 'normal' },
    type: { color: base0A },
    typeDefinition: { color: base0A, fontWeight: 'bold' },
    className: { color: base0A, fontStyle: 'italic' },
    namespace: { color: base10, fontStyle: 'italic' },
    tag: { color: base0E },
    attribute: { color: base00 },
    content: { color: base00 },
    string: { color: base0B },
    regexp: { color: invalid },
    constantName: { color: base0B },
    standardName: { color: base0B },
    number: { color: base10 },
    constant: { color: base10 },
    comment: { fontStyle: 'italic', color: base01 },
    meta: { color: base09 },
    processingInstruction: { color: base0C },
    annotation: { color: invalid, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: base0B },
    headingLevel: { color: base02 },
    heading1: { color: base03 },
    list: { color: base0B },
    quote: { color: base0C },
    monospace: { color: base00 },
    contentSeparator: { color: base0B },
    link: {
      color: base0D,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: base0B, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: base0C },
    strong: { fontWeight: 'bold', color: base02 },
    strikethrough: { color: invalid, textDecoration: 'line-through' },
    invalid: {
      color: base01,
      textDecoration: 'underline wavy',
      borderBottom: `1px dotted ${base09}`,
    },
    inserted: { color: base0C },
    deleted: { color: base09 },
    changed: { color: base10 },
  },
});

/**
 * Combined Solarized Light theme extension
 */
const solarizedLight: Extension = theme.extension;

/**
 * Solarized Light merge revert styles configuration
 */
const solarizedLightMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, solarizedLight, solarizedLightMergeStyles };
