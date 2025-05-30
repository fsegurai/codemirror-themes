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
} from '../../.helper/utils';

/**
 * Enhanced Solarized Light theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors from Solarized palette
const base00 = '#657b83'; // Body text/default text color
const base01 = '#586e75'; // Optional emphasized content
const base02 = '#073642'; // Background highlights
const base03 = '#002b36'; // Comments, invisible, line highlighting
const base04 = '#dfd9c8'; // Dark background tint
const base05 = '#93a1a1'; // Default foreground/UI text color
const base06 = '#cceeff7a'; // Light background tint (for selection)
const base07 = '#fdf6e3'; // Background - light base
const base08 = '#eee8d5'; // Background tint - light secondary

// Accent colors from Solarized palette
const base_red = '#dc322f'; // Red
const base_orange = '#cb4b16'; // Orange
const base_yellow = '#b58900'; // Yellow
const base_green = '#859900'; // Green
const base_cyan = '#2aa198'; // Cyan
const base_blue = '#268bd2'; // Blue
const base_violet = '#6c71c4'; // Violet
const base_magenta = '#d33682'; // Magenta

// UI specific colors
const invalid = '#d30102'; // Bright red for errors
const darkBackground = base04; // Darker background for panels
const highlightBackground = base06; // Active line highlight
const background = base07; // Main editor background
const tooltipBackground = '#f0e9d7'; // Tooltip background
const selection = '#ffd07a'; // Selection background
const selectionMatch = '#e1dbca90'; // Selection match with opacity
const cursor = base01; // Cursor color
const activeBracketBg = '#93a1a140'; // Active bracket background with opacity
const activeBracketBorder = base_blue; // Active bracket border - blue
const diagnosticWarning = base_yellow; // Warning color - yellow
const linkColor = base_blue; // Link color - blue
// const visitedLinkColor = base_violet; // Visited link color - violet

/**
 * Enhanced editor theme styles for Solarized Light
 */
export const solarizedLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base00,
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
      backgroundColor: '#93a1a180',
      outline: `1px solid ${base_blue}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base_blue,
      color: base08,
      padding: generalSearchField.padding,

      '& span': {
        color: base08,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base00,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base00,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base04}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base04}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base00,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: highlightBackground,
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
      color: base01,
      border: generalGutter.border,
      borderRight: `1px solid ${base04}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: base00,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base01,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base00,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base01}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
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
        color: base01,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base01,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base01,
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
        borderLeft: `3px solid ${base_red}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${base_red}`,
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
      backgroundColor: `${base_red}40`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base05}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base03,
      border: `1px dotted ${base05}70`,
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
      backgroundColor: base04,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base05,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base01,
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for the Solarized Light theme
 */
export const solarizedLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_green, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_green, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_green, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base_cyan },
  { tag: [t.variableName], color: base00 },
  { tag: [t.propertyName], color: base_cyan, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_orange },
  { tag: [t.className], color: base_orange, fontStyle: 'italic' },
  { tag: [t.namespace], color: base_magenta, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base_violet },
  { tag: [t.bracket], color: base_magenta },
  { tag: [t.brace], color: base_magenta },
  { tag: [t.punctuation], color: base01 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_blue },
  { tag: [t.labelName], color: base_magenta },
  { tag: [t.definition(t.function(t.variableName))], color: base_blue },
  { tag: [t.definition(t.variableName)], color: base_cyan },

  // Constants and literals
  { tag: t.number, color: base_magenta },
  { tag: t.changed, color: base_magenta },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base_magenta, fontStyle: 'italic' },
  { tag: t.self, color: base_magenta },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_magenta },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_green },
  { tag: [t.special(t.string), t.regexp], color: invalid },
  { tag: t.string, color: base_yellow },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_orange, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base_cyan },

  // Comments and documentation
  { tag: t.meta, color: base_red },
  { tag: t.comment, fontStyle: 'italic', color: base01 },
  { tag: t.docComment, fontStyle: 'italic', color: base01 },

  // HTML/XML elements
  { tag: [t.tagName], color: base_blue },
  { tag: [t.attributeName], color: base00 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base_yellow },
  { tag: t.heading1, color: base03 },
  { tag: t.heading2, color: base02 },
  { tag: t.heading3, color: base02 },
  { tag: t.heading4, color: base02 },
  { tag: t.heading5, color: base02 },
  { tag: t.heading6, color: base02 },
  { tag: [t.strong], fontWeight: 'bold', color: base02 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base_green },

  // Links and URLs
  {
    tag: [t.link],
    color: base_cyan,
    fontWeight: '500',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url],
    color: base_yellow,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  {
    tag: [t.invalid],
    color: base01,
    textDecoration: 'underline wavy',
    borderBottom: `1px dotted ${base_red}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base_yellow },
  { tag: t.deleted, color: base_red },
  { tag: t.squareBracket, color: base_red },
  { tag: t.angleBracket, color: base01 },

  // Additional specific styles
  { tag: t.monospace, color: base00 },
  { tag: [t.contentSeparator], color: base_yellow },
  { tag: t.quote, color: base_green },
]);

/**
 * Combined Solarized Light theme extension
 */
export const solarizedLight: Extension = [
  solarizedLightTheme,
  syntaxHighlighting(solarizedLightHighlightStyle),
];
