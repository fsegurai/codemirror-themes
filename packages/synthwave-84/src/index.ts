import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Synthwave '84 theme color definitions
 * -------------------------------------
 * Retro cyberpunk theme with neon colors inspired by 1980s aesthetics
 */

// Base colors
const base00 = '#262335', // Background - deep purple-black
  base01 = '#2a2139', // Darker background
  base02 = '#34294f', // Selection background
  base03 = '#8b9ae1', // Comments - muted blue
  base04 = '#939bce', // Dark foreground
  base05 = '#ffffff', // Foreground - white
  // Neon colors
  neonPink = '#ff7edb',
  neonCyan = '#72f1b8',
  neonYellow = '#fede5d',
  neonOrange = '#f97e72',
  neonPurple = '#b893ce',
  neonBlue = '#36f9f6',
  neonRed = '#fa7473',
  darkPurple = '#241b2f',
  glowPink = '#ff6ad5',
  glowYellow = '#f3e877';

// UI specific colors
const highlightBackground = '#2a213955',
  selectionMatch = '#34294f80',
  activeBracketBg = '#34294f88';

// Diff/merge specific colors
const addedBackground = '#72f1b830',
  removedBackground = '#fe445030';

const theme = defineTheme({
  name: "Synthwave '84",
  dark: true,
  ui: {
    background: base00,
    foreground: base05,
    border: 'none',
    cursor: neonPink,
    cursorWidth: '2px',
    cursorShadow: `0 0 8px ${neonPink}`,
    fatCursor: { background: `${neonPink}99`, border: 'none' },
    selection: '#3a2f56',
    selectionInactive: '#3a2f56',
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightBackground,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: base03,
    ghostTextOpacity: '0.5',
    specialChar: neonRed,
    focusRing: `0 0 0 2px ${base00}, 0 0 0 3px ${neonPink}40`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${neonBlue}40`,
      outline: neonBlue,
      foreground: base05,
      shadow: `0 0 4px ${neonBlue}`,
      selectedBackground: neonBlue,
      selectedForeground: base00,
      selectedOutline: `1px solid ${neonBlue}`,
      selectedShadow: `0 0 8px ${neonBlue}`,
    },
    selectionMatch: { background: selectionMatch, outline: `${base02}50` },
    matchingBracket: { background: activeBracketBg, outline: neonCyan, shadow: `0 0 8px ${neonCyan}40` },
    nonMatchingBracket: { background: `${neonRed}40`, outline: neonRed },
    panel: {
      background: darkPurple,
      foreground: base05,
      border: base03,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: base01,
      buttonForeground: neonCyan,
      buttonBorder: 'none',
      buttonHoverBackground: base02,
      buttonHoverForeground: neonCyan,
      buttonHoverBorder: 'none',
      buttonHoverShadow: `0 0 8px ${neonCyan}`,
      inputBackground: base00,
      inputBorder: `1px solid ${base03}`,
    },
    gutter: {
      background: darkPurple,
      foreground: base03,
      border: base02,
      activeBackground: base02,
      activeForeground: neonPink,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: neonCyan,
    },
    foldPlaceholder: { background: base01, foreground: neonCyan, border: `${neonCyan}70`, borderStyle: 'dotted' },
    tooltip: {
      background: base01,
      foreground: base05,
      border: neonCyan,
      shadow: `0 2px 16px ${neonCyan}40`,
      listBackground: base01,
      listBorder: 'none',
      hoverBackground: 'transparent',
      selectedBackground: base02,
      selectedForeground: neonPink,
      selectedBorder: 'none',
      icon: neonCyan,
      detail: neonYellow,
    },
    diff: {
      insertedBackground: addedBackground,
      insertedForeground: neonCyan,
      insertedBorder: `1px solid ${neonCyan}40`,
      deletedBackground: removedBackground,
      deletedForeground: neonRed,
      deletedBorder: `1px solid ${neonRed}40`,
    },
    diagnostic: {
      error: neonRed,
      warning: neonYellow,
      info: neonBlue,
      hint: neonBlue,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkPurple,
      trackBorder: 'none',
      thumb: base02,
      thumbBorder: `3px solid ${darkPurple}`,
      thumbHover: neonPurple,
      thumbHoverShadow: `0 0 8px ${neonPurple}`,
    },
    merge: {
      backgroundColor: darkPurple,
      borderColor: neonCyan,
      buttonColor: neonPink,
      buttonHoverColor: base02,
    },
  },
  syntax: {
    keyword: { color: neonPink, fontWeight: 'bold' },
    definitionKeyword: { color: neonPink },
    modifier: { color: neonPurple, fontStyle: 'italic' },
    separator: { color: neonCyan },
    operator: { color: neonCyan },
    punctuation: { color: base04 },
    bracket: { color: glowYellow },
    angleBracket: { color: neonCyan },
    brace: { color: glowPink },
    name: { color: base05 },
    localVariable: { color: neonOrange },
    variableDefinition: { color: neonOrange },
    nameDefinition: { color: neonCyan },
    function: { color: neonCyan },
    self: { color: neonRed },
    label: { color: neonCyan },
    property: { color: neonBlue, fontStyle: 'normal' },
    type: { color: neonYellow },
    typeDefinition: { color: neonYellow, fontWeight: 'bold' },
    className: { color: neonYellow, fontStyle: 'italic' },
    namespace: { color: neonOrange, fontStyle: 'italic' },
    tag: { color: neonPink },
    attribute: { color: neonYellow },
    content: { color: base05 },
    string: { color: neonCyan },
    regexp: { color: glowPink },
    number: { color: neonOrange },
    constant: { color: neonOrange },
    comment: { fontStyle: 'italic', color: base03 },
    meta: { color: base03 },
    processingInstruction: { color: neonCyan },
    annotation: { color: neonRed, fontStyle: 'italic' },
    heading: { fontWeight: 'bold', color: neonPink },
    headingLevel: { color: neonPink },
    list: { color: neonPink },
    quote: { color: neonPurple },
    monospace: { color: neonBlue, fontStyle: 'italic' },
    contentSeparator: { color: neonPurple },
    link: {
      color: neonPurple,
      fontWeight: '500',
      textDecoration: 'underline',
      textUnderlinePosition: 'under',
    },
    url: { color: neonBlue, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { fontStyle: 'italic', color: neonPink },
    strong: { fontWeight: 'bold', color: neonOrange },
    strikethrough: { color: neonRed, textDecoration: 'line-through' },
    invalid: {
      color: neonRed,
      textDecoration: 'underline wavy',
      borderBottom: `1px wavy ${neonRed}`,
    },
    inserted: { color: neonCyan },
    deleted: { color: neonRed },
    changed: { color: neonYellow },
  },
});

/**
 * Combined Synthwave '84 theme extension
 */
const synthwave84: Extension = theme.extension;

/**
 * Synthwave '84 merge revert styles configuration
 */
const synthwave84MergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, synthwave84, synthwave84MergeStyles };
