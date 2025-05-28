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
} from '@utils';

/**
 * Enhanced Tokyo Night Storm theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#24283b'; // Background
// const base01 = '#7982a9'; // Foreground
const base02 = '#414868'; // Selection background
const base03 = '#565f89'; // Comments, invisibles
// const base04 = '#989fc4'; // Dark foreground (status)
const base05 = '#c0caf5'; // Default foreground (bright blue)
const base06 = '#282e44'; // Dark background for panels
const base07 = '#1f2335'; // Darker background (gutter)

// Accent colors
const base_red = '#f7768e'; // Errors, invalid
const base_orange = '#ff9e64'; // Numbers, constants
const base_yellow = '#e0af68'; // Classes, attributes
const base_green = '#9ece6a'; // Strings, success
const base_cyan = '#2ac3de'; // Types, parameter
const base_blue = '#7aa2f7'; // Functions, properties
const base_purple = '#bb9af7'; // Keywords, operators

// UI specific colors
const invalid = '#f7768e';
const darkBackground = base07;
const highlightBackground = '#292e427a'; // Line highlight with transparency
const background = base00;
const tooltipBackground = base06;
const selection = '#6f7bb630'; // Selection background with transparency
const selectionMatch = '#6f7bb650'; // Selection match with transparency
const cursor = base05; // Cursor color
const activeBracketBg = '#3d59a150'; // Active bracket background with transparency
const activeBracketBorder = base_blue; // Active bracket border
const diagnosticWarning = base_orange; // Warning color
const linkColor = base_cyan; // Link color
const visitedLinkColor = base_purple; // Visited link color

/**
 * Enhanced editor theme styles for Tokyo Night Storm
 */
export const tokyoNightStormTheme = EditorView.theme(
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
      backgroundColor: '#7aa2f740',
      outline: `1px solid ${base_blue}`,
      color: base05,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base_blue,
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
      backgroundColor: base06,
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
      backgroundColor: base07,
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
      borderRight: `1px solid ${base07}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base07,
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
        color: base05,
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
      backgroundColor: `${base_red}20`,
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
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base_blue}40`,
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
 * Enhanced syntax highlighting for Tokyo Night Storm theme
 */
export const tokyoNightStormHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_purple, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_purple, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_purple, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: base_blue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_cyan },
  { tag: [t.className], color: base_yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: base_blue, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base_purple },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_blue },
  { tag: [t.labelName], color: base_blue, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base_blue },
  { tag: [t.definition(t.variableName)], color: base05 },

  // Constants and literals
  { tag: t.number, color: base_orange },
  { tag: t.changed, color: base_orange },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base_orange, fontStyle: 'italic' },
  { tag: t.self, color: base_orange },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_purple,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_orange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_green },
  { tag: [t.special(t.string), t.regexp], color: '#b4f9f8' },
  { tag: t.string, color: base_green },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_cyan, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base05 },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base_purple },
  { tag: [t.attributeName], color: base_yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: '#89ddff' },
  { tag: t.heading1, color: '#89ddff', fontWeight: 'bold' },
  { tag: t.heading2, color: '#89ddff' },
  { tag: t.heading3, color: '#89ddff' },
  { tag: t.heading4, color: '#89ddff' },
  { tag: t.heading5, color: '#89ddff' },
  { tag: t.heading6, color: '#89ddff' },
  { tag: [t.strong], fontWeight: 'bold', color: base05 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base_cyan },

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
  { tag: t.constant(t.name), color: base_orange },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  // Additional specific styles
  { tag: t.monospace, color: base05 },
  { tag: [t.contentSeparator], color: base_blue },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Tokyo Night Storm theme extension
 */
export const tokyoNightStorm: Extension = [
  tokyoNightStormTheme,
  syntaxHighlighting(tokyoNightStormHighlightStyle),
];
