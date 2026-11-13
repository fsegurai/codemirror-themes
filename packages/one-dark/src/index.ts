import type { Extension } from '@codemirror/state';

import { defineTheme } from './theme-core';
import { applyMergeRevertStyles, type IMergeRevertStyles } from './utils';

/**
 * One Dark theme color definitions
 * --------------------------------
 * Palette from Atom's One Dark syntax theme: https://github.com/atom/atom/tree/master/packages/one-dark-syntax
 * (GitHub Inc., MIT License, https://github.com/atom/atom/blob/master/LICENSE.md).
 * Colors below WCAG AA keep their hue and only shift lightness (OKLCH); the official value is noted next to them.
 *
 * Note: `@codemirror/theme-one-dark` also exports `oneDark`. When an app uses both packages, import one of them with
 * an alias, e.g. `import { oneDark as fseguraiOneDark } from '@fsegurai/codemirror-theme-one-dark'`.
 */

// Core palette (syntax variables `mono-*` and `hue-*`)
const background = '#282c34', // syntax-bg
  foreground = '#abb2bf', // mono-1
  mono2 = '#9fa6b5', // official #828997
  mono3 = '#9fa6b5', // comments, official #5c6370
  cyan = '#56b6c2', // hue-1
  blue = '#61afef', // hue-2
  purple = '#d688ee', // hue-3, official #c678dd
  green = '#98c379', // hue-4
  red = '#f9828a', // hue-5, official #e06c75
  orange = '#d29b67', // hue-6, official #d19a66
  gold = '#e5c07b'; // hue-6-2

// UI specific colors
const darkBackground = '#21252b',
  cursor = '#528bff', // syntax-cursor-color
  selection = '#363c49', // syntax-selection-color, official #3e4451
  activeLine = '#2c313c', // syntax-cursor-line
  gutterForeground = '#8b93a6', // syntax-gutter-text-color, official #4b5263
  tooltipBackground = '#353b45';

const theme = defineTheme({
  name: 'One Dark',
  dark: true,
  ui: {
    background,
    foreground,
    border: 'none',
    cursor,
    cursorWidth: '2px',
    cursorShadow: 'none',
    fatCursor: { background: `${cursor}99`, border: 'none' },
    selection,
    selectionInactive: selection,
    selectionForeground: null,
    selectionOutline: 'none',
    activeLine,
    activeLineBorder: { left: 'none', right: 'none' },
    ghostText: mono3,
    ghostTextOpacity: '0.6',
    specialChar: red,
    focusRing: `0 0 0 2px ${background}, 0 0 0 4px ${blue}`,
    outlineWidth: '1px',
    searchMatch: {
      background: `${blue}33`,
      outline: blue,
      foreground,
      shadow: 'none',
      selectedBackground: `${blue}66`,
      selectedForeground: foreground,
      selectedOutline: `1px solid ${blue}`,
      selectedShadow: 'none',
    },
    selectionMatch: { background: '#aafe661a', outline: `${mono3}80` },
    matchingBracket: { background: '#bad0f847', outline: foreground, shadow: 'none' },
    nonMatchingBracket: { background: `${red}40`, outline: red },
    panel: {
      background: darkBackground,
      foreground,
      border: '#181a1f',
      borderWidth: '1px',
      outline: 'none',
      shadow: 'none',
      buttonBackground: tooltipBackground,
      buttonForeground: foreground,
      buttonBorder: 'none',
      buttonHoverBackground: selection,
      buttonHoverForeground: foreground,
      buttonHoverBorder: 'none',
      buttonHoverShadow: 'none',
      inputBackground: background,
      inputBorder: `1px solid ${selection}`,
    },
    gutter: {
      background,
      foreground: gutterForeground,
      border: 'transparent',
      activeBackground: activeLine,
      activeForeground: foreground,
      activeFontWeight: '500',
      activeBorder: 'none',
      foldHover: foreground,
    },
    foldPlaceholder: { background: 'transparent', foreground: mono2, border: `${mono3}70`, borderStyle: 'dotted' },
    tooltip: {
      background: tooltipBackground,
      foreground,
      border: '#181a1f',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
      listBackground: tooltipBackground,
      listBorder: 'none',
      hoverBackground: selection,
      selectedBackground: selection,
      selectedForeground: foreground,
      selectedBorder: 'none',
      icon: blue,
      detail: mono2,
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
      warning: gold,
      info: blue,
      hint: cyan,
      errorBackground: 'transparent',
      warningBackground: 'transparent',
      infoBackground: 'transparent',
      borderWidth: '3px',
      underlineWidth: '2px',
    },
    scrollbar: {
      track: darkBackground,
      trackBorder: 'none',
      thumb: selection,
      thumbBorder: `3px solid ${darkBackground}`,
      thumbHover: gutterForeground,
      thumbHoverShadow: 'none',
    },
    merge: {
      backgroundColor: darkBackground,
      borderColor: selection,
      buttonColor: foreground,
      buttonHoverColor: selection,
    },
  },
  syntax: {
    keyword: { color: purple },
    definitionKeyword: { color: purple },
    modifier: { color: purple },
    separator: { color: foreground },
    angleBracket: { color: foreground },
    squareBracket: { color: foreground },
    brace: { color: foreground },
    operator: { color: cyan },
    punctuation: { color: foreground },
    name: { color: red },
    localVariable: { color: red },
    variableDefinition: { color: red },
    nameDefinition: { color: red },
    function: { color: blue },
    self: { color: red, fontStyle: 'italic' },
    label: { color: red },
    property: { color: red },
    type: { color: gold },
    typeDefinition: { color: gold },
    className: { color: gold },
    namespace: { color: gold },
    tag: { color: red },
    attribute: { color: orange },
    content: { color: foreground },
    string: { color: green },
    regexp: { color: cyan },
    number: { color: orange },
    constant: { color: orange },
    comment: { color: mono3, fontStyle: 'italic' },
    meta: { color: mono2 },
    processingInstruction: { color: purple },
    annotation: { color: gold },
    heading: { color: red, fontWeight: 'bold' },
    headingLevel: { color: red },
    list: { color: red },
    quote: { color: mono3, fontStyle: 'italic' },
    monospace: { color: green },
    contentSeparator: { color: mono3 },
    link: { color: blue, textDecoration: 'underline', textUnderlinePosition: 'under' },
    url: { color: cyan, textDecoration: 'underline', textUnderlineOffset: '2px' },
    emphasis: { color: purple, fontStyle: 'italic' },
    strong: { color: orange, fontWeight: 'bold' },
    strikethrough: { textDecoration: 'line-through' },
    invalid: { color: red, textDecoration: 'underline wavy', borderBottom: `1px wavy ${red}` },
    inserted: { color: green },
    deleted: { color: red },
    changed: { color: gold },
  },
});

/**
 * Combined One Dark theme extension
 */
const oneDark: Extension = theme.extension;

/**
 * One Dark merge revert styles configuration
 */
const oneDarkMergeStyles: IMergeRevertStyles = theme.mergeStyles;

export { applyMergeRevertStyles, oneDark, oneDarkMergeStyles };
