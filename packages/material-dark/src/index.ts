import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  generalContent,
  generalCursor,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
} from '@fsegurai/codemirror-theme-utils';

/**
 * Enhanced Material Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#212121'; // Background
const base01 = '#505d64'; // Lighter background (popups, statuslines)
const base02 = '#606f7a'; // Selection background
const base03 = '#707d8b'; // Comments, invisibles, line highlighting
const base04 = '#a0a4ae'; // Dark foreground (cursor)
const base05 = '#bdbdbd'; // Default foreground
const base06 = '#e0e0e0'; // Light foreground
const base07 = '#202325'; // Dark background (gutter)

// Accent colors
const base_red = '#ff5f52'; // Keywords, storage, errors
const base_deeporange = '#ff6e40'; // Constants, attributes
const base_pink = '#fa5788'; // Regex, special symbols
const base_yellow = '#facf4e'; // Classes, numbers
const base_orange = '#ffad42'; // Strings, values
const base_cyan = '#56c8d8'; // Support, functions
const base_indigo = '#7186f0'; // Variables, parameters
const base_purple = '#cf6edf'; // Operators, tags
const base_green = '#6abf69'; // Added elements
const base_lightgreen = '#99d066'; // Modified elements
const base_teal = '#4ebaaa'; // Markup headings

// UI specific colors
const invalid = base_red;
const darkBackground = base07;
const highlightBackground = '#2d333b30'; // Line highlight with transparency
const background = base00;
const tooltipBackground = base01;
const selection = '#ffffff1f'; // Selection background with transparency
const selectionMatch = '#4A707A80'; // Selection match background with transparency
const cursor = base04; // Cursor color
const activeBracketBg = '#39496650'; // Active bracket background with transparency
const activeBracketBorder = base_cyan; // Active bracket border
const diagnosticWarning = base_orange; // Warning color
const linkColor = base_cyan; // Link color
const visitedLinkColor = base_purple; // Visited link color

/**
 * Enhanced editor theme styles for Material Dark
 */
export const materialDarkTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base05,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
    },

    // Content and cursor
    '.cm-content': {
      caretColor: cursor,
      lineHeight: generalContent.lineHeight,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
      borderLeftWidth: generalCursor.borderLeftWidth,
    },
    '.cm-fat-cursor': {
      backgroundColor: `${cursor}99`,
      color: background,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#394966cc',
      outline: `1px solid ${base_cyan}`,
      color: base06,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base06,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base_cyan,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: background,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base00,
      color: base05,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base03}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base03}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base05,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base01}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#252a2c',
      color: base05,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base03,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base05,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base03}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: 'none',
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: selection,
        color: base06,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base03,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base03,
        fontStyle: 'italic',
      },
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },

    // Diagnostics styling
    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `3px solid ${invalid}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${diagnosticWarning}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#ff5f5240',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base02}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base03,
      border: `1px dotted ${base03}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base_cyan}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: darkBackground,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base02,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base03,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base03,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Material Dark theme
 */
export const materialDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_red, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_red, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_red, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base_indigo },
  { tag: [t.variableName], color: base_lightgreen },
  { tag: [t.propertyName], color: base_purple, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_red },
  { tag: [t.className], color: base_yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: base_indigo, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_cyan },
  { tag: [t.labelName], color: base_cyan, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base_cyan },
  { tag: [t.definition(t.variableName)], color: base_indigo },

  // Constants and literals
  { tag: t.number, color: base_yellow },
  { tag: t.changed, color: base_yellow },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base_deeporange, fontStyle: 'italic' },
  { tag: t.self, color: base_deeporange },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_deeporange,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_deeporange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_green },
  { tag: [t.special(t.string), t.regexp], color: base_pink },
  { tag: t.string, color: base_orange },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_red, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base_purple },
  { tag: [t.attributeName], color: base_yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base_teal },
  { tag: t.heading1, color: base_yellow },
  { tag: t.heading2, color: base_orange },
  { tag: t.heading3, color: base_cyan },
  { tag: t.heading4, color: base_indigo },
  { tag: t.heading5, color: base_purple },
  { tag: t.heading6, color: base_red },
  { tag: [t.strong], fontWeight: 'bold', color: base_indigo },
  { tag: [t.emphasis], fontStyle: 'italic', color: base_orange },

  // Links and URLs
  {
    tag: [t.link],
    color: visitedLinkColor,
    fontWeight: '500',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url],
    color: linkColor,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  {
    tag: [t.invalid],
    color: base05,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base_deeporange },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  // Additional specific styles
  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base_indigo },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Material Dark theme extension
 */
export const materialDark: Extension = [
  materialDarkTheme,
  syntaxHighlighting(materialDarkHighlightStyle),
];
