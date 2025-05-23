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

// Enhanced Abcdef theme colors with improved contrast and harmony
const base00 = '#0a0e14', // Background (slightly deeper for better contrast)
  base01 = '#e0edff', // Foreground (slightly bluer tint for better readability)
  base02 = '#3a4a5f', // Selection (richer blue tone)
  base03 = '#242936', // Gutter background (distinguished from selection)
  base04 = '#d8e1f0', // Gutter foreground (softer white)
  base05 = '#4fc1ff', // Caret (bright cyan blue for visibility)
  base06 = '#3a4a5f40', // Line highlight with balanced opacity
  base07 = '#1a2030', // Dark background for panels
  base08 = '#efbb24', // Keyword (warm gold instead of darkgoldenrod)
  base09 = '#7799ff', // Atom (brighter blue)
  base0A = '#8c8f93', // Comment (slightly bluer gray)
  base0B = '#c792ea', // Number (softer purple)
  base0C = '#ffee99', // Definition, Function (softer yellow)
  base0D = '#abcdef', // Variable (keeping the theme's signature color)
  base0E = '#ffcc44', // Type Name (warmer yellow)
  base0F = '#99c2ff', // Tag Name (light blue)
  // UI elements
  invalid = '#ff5370', // Invalid color (more visible red)
  darkBackground = base07,
  highlightBackground = base06,
  tooltipBackground = '#0f1521', // Darker tooltip for better contrast
  cursor = base05,
  selection = base02,
  selectionForeground = '#ffffff', // Selection text color
  activeBracketBg = '#3a4a5f60', // Active bracket background
  activeBracketBorder = '#abcdef'; // Active bracket border (signature color);

/**
 * Enhanced editor theme styles for Abcdef
 */
export const abcdefTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base01,
      backgroundColor: base00,
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
      color: base00,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
      },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: `${base0F}40`,
      outline: `1px solid ${base0F}`,

      '& span': {
        color: selectionForeground,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#38465b63',
      outline: `3px solid ${base0F}`,
      padding: generalSearchField.padding,

      '& span': {
        color: selectionForeground,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base04,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base04,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid #1c2838',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid #1c2838',
    },
    '.cm-panel button': {
      backgroundColor: base02,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#4a5a6f',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base03,
      color: base04,
      border: generalGutter.border,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: '#ffffff',
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base04,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base0D,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #3a4a5f',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: '#3a4a5f',
        color: '#e0edff',
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base0D,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base0A,
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
        borderLeft: `3px solid ${base08}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base05}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base08}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#3a4a5f40',
      outline: '1px solid #abcdef',
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: '#3a4a5f40',
      outline: '1px solid #abcdef',
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: '#3a4a5f40',
      color: '#abcdef',
      fontStyle: 'italic',
      border: `1px dotted ${activeBracketBorder}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base0D}40`,
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
      backgroundColor: `${base02}AA`,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base07}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base02,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base04,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Abcdef theme
 */
export const abcdefHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base08, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base08, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base09 },
  { tag: [t.variableName], color: base09 },
  { tag: [t.propertyName], color: base0D, fontStyle: 'normal' },

  // Classes and types
  { tag: t.typeName, color: base0E },
  { tag: t.className, color: base0D, fontStyle: 'italic' },
  { tag: t.namespace, color: '#78a0d3', opacity: 0.8 },

  // Operators and punctuation - clearer blues
  { tag: [t.operator, t.operatorKeyword], color: '#ff9cac' },
  { tag: [t.bracket], color: '#d0d6e0' },
  { tag: [t.brace], color: '#d0d6e0' },
  { tag: [t.punctuation], color: '#d0d6e0' },

  // Functions and parameters
  { tag: t.function(t.variableName), color: base0C },
  { tag: t.definition(t.variableName), color: base0C },

  // Constants and literals
  { tag: t.number, color: base0B },
  { tag: t.changed, color: '#ff9cac' },
  { tag: t.annotation, color: '#ffad5c', fontStyle: 'italic' },
  { tag: t.modifier, color: '#ffad5c', fontStyle: 'italic' },
  { tag: t.self, color: base0B },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0B },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0B },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: '#7aecb3' },
  { tag: [t.special(t.string), t.regexp], color: '#6acdbe' /* Turquoise */ },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0E, fontWeight: 'bold' },
  { tag: [t.operator, t.operatorKeyword], color: '#ff9cac' },
  { tag: t.bracket, color: '#d0d6e0' },
  { tag: [t.brace], color: '#d0d6e0' },
  { tag: t.punctuation, color: '#d0d6e0' },

  // Comments and documentation
  { tag: t.meta, color: '#78a0d3' },
  { tag: t.comment, fontStyle: 'italic', color: base0A },
  { tag: t.docComment, fontStyle: 'italic', color: base0A },

  // HTML/XML elements
  { tag: t.tagName, color: base0F },
  { tag: t.attributeName, color: '#ffad5c' },

  // Markdown and text formatting
  { tag: t.heading, color: base0E, fontWeight: 'bold' },
  { tag: [t.emphasis], fontStyle: 'italic' },
  { tag: [t.strong], fontWeight: 'bold' },

  // Links and URLs
  { tag: t.link, color: '#ffcc44', fontWeight: '500' },
  {
    tag: t.url,
    color: '#66c2ff',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: t.invalid, color: invalid, textDecoration: 'underline wavy' },
  { tag: t.strikethrough, color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0B },
  { tag: t.controlKeyword, color: base08, fontWeight: 'bold' },
  { tag: t.deleted, color: invalid },
  { tag: t.labelName, color: '#ffad5c' },
  { tag: t.string, color: '#7aecb3' /* New mint green for strings */ },
]);

// Extension to enable the improved Abcdef theme
export const abcdef: Extension = [
  abcdefTheme,
  syntaxHighlighting(abcdefHighlightStyle),
];
