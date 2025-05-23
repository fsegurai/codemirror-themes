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

// Base colors - Ocean depths
const base00 = '#000c18', // - Background (deep ocean blue)
  base01 = '#a3c9e9', // - Foreground (lighter blue for enhanced readability)
  base02 = '#0e6299', // - Selection (more vibrant blue for better visibility)
  base03 = '#b4a2f7', // - Gutter background (darker for contrast)
  base04 = '#e6d4a3', // - Cursor (warmer gold for better visibility)
  base05 = '#0066ff20', // - Active line (subtle blue tint)
  base06 = '#ffffff', // - Pure white for maximum contrast
  base07 = '#47c1ff', // - Keywords (brighter cyan blue)
  base08 = '#5caeff', // - Variables (softer azure blue)
  base09 = '#7599c2', // - Comments (brighter blue-gray)
  base0A = '#4ce660', // - Strings (kept vibrant green for contrast)
  base0B = '#c3a2f7', // - Functions (softer purple)
  base0C = '#ff9eea', // - Constants (softer pink)
  base0D = '#ffd47b', // - Classes (warmer gold)
  base0E = '#8eb8ff', // - Headings (brighter sky blue)
  base0F = '#59d6ff', // - Tags (brighter cyan)
  base10 = '#ff50c8', // - Links (brighter magenta)
  base11 = '#66ecd4', // - URLs (brighter teal)
  // UI elements
  invalid = '#ff5370',
  darkBackground = '#0a1422', // Darker background for better contrast
  highlightBackground = '#0055ff15',
  tooltipBackground = '#05101d', // Darker tooltip for better contrast
  cursor = base04,
  selection = base02,
  activeBracketBg = '#0a5999b0',
  activeBracketBorder = base0F;


/**
 * Enhanced editor theme styles for Abyss
 */
export const abyssTheme = EditorView.theme(
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
      backgroundColor: '#155ab380',
      outline: `1px solid ${base08}`,

      '& span': {
        color: base06,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#2a6ac080',
      color: base06,
      padding: generalSearchField.padding,

      '& span': {
        color: base06,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base01,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base01,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '2px solid #0a3555',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid #0a3555',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#0a3555',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: '#5f7e97',
      border: generalGutter.border,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: base01,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: '#5f7e97',
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base01,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #084671',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: '#084671',
        color: '#e0edff',
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: '#5f7e97',
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: '#5f7e97',
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
        borderLeft: `3px solid ${base0B}`,
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
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#780e1e80',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: '#155ab340',
      outline: `1px solid ${base08}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: '#5f7e97',
      fontStyle: 'italic',
      border: `1px dotted ${activeBracketBorder}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base05}, 0 0 0 4px ${base00}`,
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
      backgroundColor: '#5f7e97',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#4cc9ff',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#ffffff',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for the Abyss theme
 */
export const abyssHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base07, fontWeight: 'bold' },
  { tag: t.controlKeyword, color:base0F, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base07, fontWeight: 'bold' },


  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base08 },
  { tag: [t.variableName], color: '#7ab2ff' },
  { tag: [t.propertyName], color: base0E, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base03 },
  { tag: [t.className], color: base0D, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0C, fontStyle: 'italic' },

  // Operators and punctuation - clearer blues
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base01 },
  { tag: [t.brace], color: base01 },
  { tag: [t.punctuation], color: base01 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base0B },
  { tag: [t.definition(t.variableName)], color: base0B },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0C },
  { tag: t.annotation, color: base0C, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0C },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ff9e64' },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0A },
  { tag: [t.special(t.string), t.regexp], color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0B, fontWeight: 'bold' },
  { tag: [t.operator, t.operatorKeyword], color: '#78b6ff' },
  { tag: [t.bracket], color: '#8da0bf' },
  { tag: [t.brace], color: '#8da0bf' },
  { tag: [t.punctuation], color: '#8da0bf' },

  // Comments and documentation
  { tag: t.meta,  color: base09 },
  { tag: t.comment, fontStyle: 'italic', color: base09 },
  { tag: t.docComment, fontStyle: 'italic', color: base09 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0F },
  { tag: [t.attributeName], color: '#ffd580' },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0E },
  { tag: [t.strong], fontWeight: 'bold' },
  { tag: [t.emphasis], fontStyle: 'italic' },

  // Links and URLs
  { tag: [t.link], color: base10, fontWeight: '500' },
  {
    tag: [t.url],
    color: base11,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: [t.invalid], color: invalid, textDecoration: 'underline wavy' },
  { tag: [t.strikethrough], color:invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0C },
  { tag: t.controlKeyword, color: base07, fontWeight: 'bold' },
  { tag: t.deleted, color: base08 },
  { tag: t.labelName, color: base0B },
  { tag: t.string, color: base0A },
]);

/**
 * Combined Abyss theme extension
 */
export const abyss: Extension = [
  abyssTheme,
  syntaxHighlighting(abyssHighlightStyle),
];
