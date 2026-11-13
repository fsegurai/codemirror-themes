import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * Dracula theme color definitions
 * -------------------------------
 * Palette from the official Dracula specification: https://draculatheme.com/spec
 * (Dracula Theme, MIT License, https://github.com/dracula/dracula-theme/blob/main/LICENSE).
 * Colors below WCAG AA keep their hue and only shift lightness (OKLCH); the official value is noted next to them.
 */

// Core palette
const background = '#282a36',
  currentLine = '#44475a',
  foreground = '#f8f8f2',
  comment = '#92a4d9', // official #6272a4
  cyan = '#8be9fd',
  green = '#50fa7b',
  orange = '#ffb86c',
  pink = '#ff79c6',
  purple = '#bd93f9',
  red = '#ff7d77', // official #ff5555
  yellow = '#f1fa8c';

// UI specific colors
const darkBackground = '#21222c',
  selection = `${currentLine}8c`, // Current Line at 55% so every syntax color keeps 4.5:1 on a selection
  activeLine = `${currentLine}26`, // Current Line at 15% so the selection stays visible on the active line
  gutterForeground = '#7f90c4'; // official Comment #6272a4

const theme = defineTheme({
  name: 'Dracula',
  dark: true,
  ui: {
    background,
    foreground,
    border: 'none',
    cursor: foreground,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${foreground}99`, border: 'none' },
    selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: comment,
    ghostTextOpacity: '0.6',
    specialChar: red,
    focusRing: `0 0 0 2px ${background}, 0 0 0 4px ${purple}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${orange}40`,
      outline: orange,
      foreground,
      shadow: 'none',
      selectedBackground: orange,
      selectedForeground: background,
      selectedOutline: `1px solid ${orange}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: `${currentLine}80`, outline: `${comment}80` },
    matchingBracket: { background: `${currentLine}80`, outline: green, shadow: 'none' },
    nonMatchingBracket: { background: `${red}40`, outline: red },
    panel: {
      background: darkBackground,
      foreground,
      border: currentLine,
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: currentLine,
      buttonForeground: foreground,
      buttonBorder: 'none',
      buttonHoverBackground: comment,
      buttonHoverForeground: foreground,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: background,
      inputBorder: `1px solid ${currentLine}`,
    },
    gutter: {
      background,
      foreground: gutterForeground,
      border: currentLine,
      activeBackground: currentLine,
      activeForeground: foreground,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: foreground,
    },
    foldPlaceholder: { background: currentLine, foreground: comment, border: `${comment}70`, borderStyle: 'dotted' },
    tooltip: {
      background: darkBackground,
      foreground,
      border: currentLine,
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: darkBackground,
      listBorder: 'none',
      hoverBackground: currentLine,
      selectedBackground: currentLine,
      selectedForeground: foreground,
      selectedBorder: 'none',
      icon: purple,
      detail: comment,
    },
    diff: {
      insertedBackground: `${green}26`,
      insertedForeground: green,
      insertedBorder: `1px solid ${green}40`,
      deletedBackground: `${red}26`,
      deletedForeground: red,
      deletedBorder: `1px solid ${red}40`,
    },
    diagnostic: {
      error: red,
      warning: orange,
      info: cyan,
      hint: purple,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: currentLine,
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: comment,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: currentLine,
      buttonColor: foreground,
      buttonHoverColor: currentLine,
    },
  },
  syntax: {
    keyword: { color: pink },
    definitionKeyword: { color: pink },
    modifier: { color: pink },
    separator: { color: foreground },
    angleBracket: { color: foreground },
    squareBracket: { color: foreground },
    brace: { color: foreground },
    operator: { color: pink },
    punctuation: { color: foreground },
    name: { color: foreground },
    localVariable: { color: foreground },
    variableDefinition: { color: foreground },
    nameDefinition: { color: green },
    function: { color: green },
    self: { color: purple, fontStyle: 'italic' },
    label: { color: cyan },
    property: { color: foreground },
    type: { color: cyan, fontStyle: 'italic' },
    typeDefinition: { color: cyan, fontStyle: 'italic' },
    className: { color: cyan },
    namespace: { color: cyan },
    tag: { color: pink },
    attribute: { color: green, fontStyle: 'italic' },
    content: { color: foreground },
    string: { color: yellow },
    regexp: { color: red },
    number: { color: purple },
    constant: { color: purple },
    comment: { color: comment, fontStyle: 'italic' },
    meta: { color: comment },
    processingInstruction: { color: pink },
    annotation: { color: green, fontStyle: 'italic' },
    heading: { color: purple, fontWeight: 'bold' },
    headingLevel: { color: purple },
    list: { color: cyan },
    quote: { color: yellow, fontStyle: 'italic' },
    monospace: { color: green },
    contentSeparator: { color: comment },
    link: { color: cyan, textDecoration: 'underline', textUnderlinePosition: 'under' },
    url: { color: cyan, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { color: yellow, fontStyle: 'italic' },
    strong: { color: orange, fontWeight: 'bold' },
    strikethrough: { textDecoration: 'line-through' },
    invalid: { color: red, textDecoration: 'underline wavy', borderBottom: `1px wavy ${red}` },
    inserted: { color: green },
    deleted: { color: red },
    changed: { color: orange },
  },
});

/**
 * Combined Dracula theme extension
 */
const dracula: Extension = theme.extension;

/**
 * Dracula merge revert styles configuration
 */
const draculaMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, dracula, draculaMergeStyles };
