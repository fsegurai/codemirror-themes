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
 * Enhanced Material Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#ffffff'; // Background - pure white for clean look
const base01 = '#f5f5f5'; // Lighter background (popups, statuslines)
const base02 = '#212121'; // Main text - nearly black for contrast
const base03 = '#757575'; // Comments, invisibles - gray 600
const base04 = '#9e9e9e'; // Cursor and line numbers - gray 500
const base05 = '#424242'; // Default foreground - gray 800
const base06 = '#eeeeee'; // Light borders or divisions - gray 200
const base07 = '#fafafa'; // Light background (gutter) - gray 50

// Accent colors - using standard Material Design palette
const base_red = '#f44336'; // Red 500
const base_deeporange = '#ff3e00'; // Deep Orange 500
const base_pink = '#FF00E9FF'; // Pink 500
const base_yellow = '#ffc107'; // Amber 500 (better than yellow for light theme)
const base_orange = '#ff9800'; // Orange 500
const base_cyan = '#00acc1'; // Cyan 600 (better contrast for light theme)
const base_indigo = '#3949ab'; // Indigo 600 (better contrast for light theme)
const base_purple = '#8e24aa'; // Purple 600 (better contrast for light theme)
const base_green = '#43a047'; // Green 600 (better contrast for light theme)
// const base_lightgreen = '#7cb342'; // Light Green 600 (better contrast)
const base_teal = '#00897b'; // Teal 600 (better contrast for light theme)
const base_blue = '#1e88e5'; // Blue 600 (better contrast for light theme)

// UI specific colors
const invalid = base_red;
const highlightBackground = '#00000008'; // Line highlight
const background = base00;
const tooltipBackground = base01;
const selection = '#DDEEFF'; // Selection background
const selectionMatch = '#90a4ae26'; // Selection match background
const cursor = base04; // Cursor color
const activeBracketBg = '#DDEEFF80'; // Active bracket background
const activeBracketBorder = base_cyan; // Active bracket border
const diagnosticWarning = base_orange; // Warning color
const linkColor = base_cyan; // Link color
const visitedLinkColor = base_purple; // Visited link color
const hoverHighlight = '#ECEFF180'; // Hover highlight

/**
 * Enhanced editor theme styles for Material Light
 */
export const materialLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base02,
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
      backgroundColor: `${base02}99`,
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
      backgroundColor: '#FFA72680',
      outline: `1px solid ${base_yellow}`,
      color: base02,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base02,
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
      color: base02,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base06,
      color: base02,
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base04}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base04}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base02,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#CFD8DC',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base07,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base04}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#E0E0E0',
      color: base02,
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
      transition: 'color 0.15s ease',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base02,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${base04}`,
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
        backgroundColor: hoverHighlight,
        color: base02,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li:hover': {
        backgroundColor: hoverHighlight,
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
      backgroundColor: `${invalid}20`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base03}30`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: base01,
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
      background: base07,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base03,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base07}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base02,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base03,
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for Material Light theme
 */
export const materialLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_cyan, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_cyan, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_cyan, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: base_teal, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_orange },
  { tag: [t.className], color: base_orange, fontStyle: 'italic' },
  { tag: [t.namespace], color: base_indigo, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base_indigo },
  { tag: [t.bracket], color: base_purple },
  { tag: [t.brace], color: base_purple },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_deeporange },
  { tag: [t.labelName], color: base_blue, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base_deeporange },
  { tag: [t.definition(t.variableName)], color: base_pink },

  // Constants and literals
  { tag: t.number, color: base_orange },
  { tag: t.changed, color: base_orange },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base_orange, fontStyle: 'italic' },
  { tag: t.self, color: base_orange },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base_orange,
  },
  { tag: [t.atom, t.bool], color: base_purple },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_green },
  { tag: t.string, color: base_green },
  { tag: [t.special(t.string), t.regexp], color: base_pink },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_pink, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base_pink },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base_deeporange },
  { tag: [t.attributeName], color: base05 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base_teal },
  { tag: t.heading1, color: base_blue },
  { tag: t.heading2, color: base_orange },
  { tag: t.heading3, color: base_cyan },
  { tag: t.heading4, color: base_indigo },
  { tag: t.heading5, color: base_purple },
  { tag: t.heading6, color: base_green },
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
    color: base02,
    textDecoration: 'underline wavy',
    borderBottom: `1px dotted ${base_red}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base_deeporange },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base_red },
  { tag: t.angleBracket, color: base02 },

  // Additional specific styles
  { tag: t.monospace, color: base02 },
  { tag: [t.contentSeparator], color: base_cyan },
  { tag: t.quote, color: base_green },
]);

/**
 * Combined Material Light theme extension
 */
export const materialLight: Extension = [
  materialLightTheme,
  syntaxHighlighting(materialLightHighlightStyle),
];
