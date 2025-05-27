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
 * Enhanced Basic Dark theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#1e2124',  // Background (slightly darker for better contrast)
  base01 = '#e2e2e2',  // Foreground (slightly brighter for better readability)
  base02 = '#5c88da',  // Selection elements (more vibrant blue)
  base03 = '#b8b8b8',  // Comments, line numbers (slightly lighter)
  base04 = '#ffffff',  // Cursor (pure white for better visibility)
  base05 = '#e4e4e4',  // Panels foreground
  base06 = '#909090',  // Comments (slightly more visible gray)
  base07 = '#000000',  // Pure black for contrast elements
  base08 = '#e06c75',  // Error, deleted (more vibrant red)
  base09 = '#f39c12',  // Number, boolean (warmer orange)
  base0A = '#ffcb6b',  // Keywords (warmer yellow)
  base0B = '#98c379',  // Strings (more vibrant green)
  base0C = '#56b6c2',  // Classes, types (cyan blue)
  base0D = '#61afef',  // Functions, methods (bright blue)
  base0E = '#c678dd',  // Operators, brackets (brighter purple)
  base0F = '#be5046',  // Special elements (darker red)

  // UI-specific colors
  invalid = '#e06c75',  // Error highlighting (consistent red)
  darkBackground = '#252529',  // Panel background (slightly darker)
  selectionBackground = '#3a5991aa',  // Selection background (semi-transparent blue)
  highlightBackground = '#3a3d4166',  // Active line background (subtle blue-gray)
  tooltipBackground = '#2a2c31',  // Tooltip background (darker than editor)
  cursor = base04,
  activeBracketBg = '#3a599140',
  activeBracketBorder = base0E;

/**
 * Enhanced editor theme styles for Basic Dark
 */
export const basicDarkTheme = EditorView.theme(
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
        backgroundColor: selectionBackground,
        color: base01,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#4a74c480',
      outline: `1px solid ${base02}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#5c88da90',
      color: base01,
      padding: generalSearchField.padding,

      '& span': {
        color: base01,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base05,
      borderRadius: '0 0 4px 4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '1px solid #3a3a3a',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '1px solid #3a3a3a',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base05,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#35373d',
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
      color: base06,
      border: generalGutter.border,
      borderRight: '1px solid #35383d',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: base03,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base06,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base01,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #3a3a3a',
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
        backgroundColor: selectionBackground,
        color: base01,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base06,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base06,
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
        borderLeft: `3px solid ${base0A}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base0D}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base0A}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}60`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#e06c7540',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: '#4a74c440',
      outline: `1px solid ${base02}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: base02,
      border: `1px dotted ${base02}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base02}40`,
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
      backgroundColor: '#444448',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#55555a',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#b8b8b8',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Basic Dark theme
 */
export const basicDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0A, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0A, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0A, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base0D },
  { tag: [t.variableName], color: base0D },
  { tag: [t.propertyName], color: base0C, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0C },
  { tag: [t.className], color: base0C, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0D, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base0E },
  { tag: [t.brace], color: base0E },
  { tag: [t.punctuation], color: base0E },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base0D },
  { tag: [t.definition(t.variableName)], color: base0D },

  // Constants and literals
  { tag: t.number, color: base09 },
  { tag: t.changed, color: base09 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base09, fontStyle: 'italic' },
  { tag: t.self, color: base09 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base09 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.special(t.string), t.regexp], color: base0B },
  { tag: t.string, color: base0B },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0C, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base08 },
  { tag: t.comment, fontStyle: 'italic', color: base06 },
  { tag: t.docComment, fontStyle: 'italic', color: base06 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0A },
  { tag: [t.attributeName], color: base0D },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0A },
  { tag: [t.strong], fontWeight: 'bold', color: base09, textShadow: `0 0 2px ${base07}` },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0D },

  // Links and URLs
  { tag: [t.link], color: base0F, fontWeight: '500', textDecoration: 'underline', textUnderlinePosition: 'under' },
  {
    tag: [t.url],
    color: base0B,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: [t.invalid], color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${invalid}` },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base0E },
  { tag: t.angleBracket, color: base0E },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base0D },
  { tag: t.quote, color: base06 },
]);

/**
 * Combined Basic Dark theme extension
 */
export const basicDark: Extension = [
  basicDarkTheme,
  syntaxHighlighting(basicDarkHighlightStyle),
];