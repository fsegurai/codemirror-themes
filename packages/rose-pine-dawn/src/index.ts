import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Rosé Pine Dawn theme color definitions
 * --------------------------------------
 * Palette from the official Rosé Pine palette (Dawn variant): https://rosepinetheme.com/palette
 * (Rosé Pine, MIT License, https://github.com/rose-pine/rose-pine-theme/blob/main/license).
 * Colors below WCAG AA keep their hue and only shift lightness (OKLCH); the official value is noted next to them.
 */

// Core palette
const base = '#faf4ed',
  surface = '#fffaf3',
  overlay = '#f2e9e1',
  muted = '#625e6e', // official #9893a5
  subtle = '#615d7a', // official #797593
  text = '#575279',
  love = '#95475e', // official #b4637a
  gold = '#885501', // official #ea9d34
  rose = '#974847', // official #d7827e
  pine = '#266781', // official #286983
  foam = '#286873', // official #56949f
  iris = '#6d5784', // official #907aa9
  highlightLow = '#f4ede8',
  highlightMed = '#dfdad9',
  highlightHigh = '#cecacd';

const theme = defineTheme({
  name: 'Rosé Pine Dawn',
  dark: false,
  ui: {
    background: base,
    foreground: text,
    border: 'none',
    cursor: text,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${muted}99`, border: 'none' },
    selection: highlightMed,
    selectionInactive: highlightMed,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine: highlightLow,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: muted,
    ghostTextOpacity: '0.6',
    specialChar: love,
    focusRing: `0 0 0 2px ${base}, 0 0 0 4px ${iris}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${gold}33`,
      outline: gold,
      foreground: text,
      shadow: 'none',
      selectedBackground: highlightHigh,
      selectedForeground: text,
      selectedOutline: `1px solid ${rose}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: `${highlightMed}99`, outline: `${muted}80` },
    matchingBracket: { background: highlightMed, outline: muted, shadow: 'none' },
    nonMatchingBracket: { background: `${love}26`, outline: love },
    panel: {
      background: surface,
      foreground: text,
      border: highlightMed,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: overlay,
      buttonForeground: text,
      buttonBorder: 'none',
      buttonHoverBackground: highlightMed,
      buttonHoverForeground: text,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: base,
      inputBorder: `1px solid ${highlightHigh}`,
    },
    gutter: {
      background: base,
      foreground: '#726e7f', // official Muted #9893a5
      border: highlightLow,
      activeBackground: highlightLow,
      activeForeground: text,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: text,
    },
    foldPlaceholder: { background: overlay, foreground: subtle, border: `${muted}70`, borderStyle: 'dotted' },
    tooltip: {
      background: surface,
      foreground: text,
      border: highlightMed,
      shadow: '0 2px 8px rgba(87, 82, 121, 0.15)',
      listBackground: surface,
      listBorder: 'none',
      hoverBackground: overlay,
      selectedBackground: highlightMed,
      selectedForeground: text,
      selectedBorder: 'none',
      icon: iris,
      detail: subtle,
    },
    diff: {
      insertedBackground: `${foam}26`,
      insertedForeground: foam,
      insertedBorder: `1px solid ${foam}40`,
      deletedBackground: `${love}26`,
      deletedForeground: love,
      deletedBorder: `1px solid ${love}40`,
    },
    diagnostic: {
      error: love,
      warning: gold,
      info: foam,
      hint: iris,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: base,
      trackBorder: 'none',
      thumb: highlightMed,
      thumbBorder: `3px solid ${base}`,
      thumbHover: highlightHigh,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: surface,
      borderColor: highlightMed,
      buttonColor: text,
      buttonHoverColor: overlay,
    },
  },
  syntax: {
    keyword: { color: pine },
    definitionKeyword: { color: pine },
    modifier: { color: pine },
    separator: { color: subtle },
    angleBracket: { color: subtle },
    squareBracket: { color: subtle },
    brace: { color: subtle },
    operator: { color: subtle },
    punctuation: { color: subtle },
    name: { color: text },
    localVariable: { color: text },
    variableDefinition: { color: text },
    nameDefinition: { color: rose },
    function: { color: rose },
    self: { color: love, fontStyle: 'italic' },
    label: { color: foam },
    property: { color: foam },
    type: { color: foam },
    typeDefinition: { color: foam },
    className: { color: foam },
    namespace: { color: iris },
    tag: { color: foam },
    attribute: { color: iris },
    content: { color: text },
    string: { color: gold },
    regexp: { color: iris },
    number: { color: gold },
    constant: { color: rose },
    comment: { color: muted, fontStyle: 'italic' },
    meta: { color: subtle },
    processingInstruction: { color: pine },
    annotation: { color: iris },
    heading: { color: iris, fontWeight: 'bold' },
    headingLevel: { color: iris },
    list: { color: pine },
    quote: { color: subtle, fontStyle: 'italic' },
    monospace: { color: gold },
    contentSeparator: { color: muted },
    link: { color: iris, textDecoration: 'underline', textUnderlinePosition: 'under' },
    url: { color: foam, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { color: text, fontStyle: 'italic' },
    strong: { color: text, fontWeight: 'bold' },
    strikethrough: { textDecoration: 'line-through' },
    invalid: { color: love, textDecoration: 'underline wavy', borderBottom: `1px wavy ${love}` },
    inserted: { color: foam },
    deleted: { color: love },
    changed: { color: gold },
  },
});

/**
 * Combined Rosé Pine Dawn theme extension
 */
const rosePineDawn: Extension = theme.extension;

/**
 * Rosé Pine Dawn merge revert styles configuration
 */
const rosePineDawnMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, rosePineDawn, rosePineDawnMergeStyles };
