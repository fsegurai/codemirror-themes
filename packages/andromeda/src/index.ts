import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  applyMergeRevertStyles,
  generalContent,
  generalCursor,
  generalDiff,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
  IMergeRevertStyles,
} from './utils';

/**
 * Enhanced Andromeda theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#1b1e26',  // Background (slightly darker for better contrast)
  base01 = '#e4dff0',  // Foreground (slightly brighter for better readability)
  base02 = '#db45a270', // Selection and Selection Match (reduced opacity)
  base03 = '#2b303b',   // Dropdown Background
  base04 = '#ffffff',   // Cursor (pure white for better visibility)
  base05 = '#d667ff',   // Keyword, Storage (brighter purple)
  base06 = '#24e3c3',   // Variable, Parameter (slightly desaturated teal)
  base07 = '#ffdd80',   // Function, Type, Class (warmer yellow)
  base08 = '#a6e07a',   // String, RegExp (slightly muted green for better readability)
  base09 = '#ff7057',   // Constant, Number (brighter orange-red)
  base0A = '#a8aab9',   // Comment (higher contrast gray)
  base0B = '#ff40b3',   // Heading (slightly desaturated magenta)
  base0C = '#fd3681',   // Tag (adjusted pink)
  base0D = '#c7c7ff',   // New color for brackets/punctuation
  base0E = '#6ae4b9',   // New color for special elements
  base0F = '#3c94ff',   // New color for attributes and links
  invalid = '#ff3162',  // Invalid (more visible red)
  // UI-specific colors
  darkBackground = '#242830',
  selectionBackground = base02,
  selectionForeground = '#ffffff',
  highlightBackground = '#30343d40',
  tooltipBackground = '#1f232d', // Darker tooltip for better contrast
  cursor = base04,
  activeBracketBg = '#db45a230',
  activeBracketBorder = base05,
  // Diff/merge specific colors
  addedBackground = '#0f3a2440', // Dark green with transparency for insertions
  removedBackground = '#78112230', // Dark red with transparency for deletions
  addedText = base08, // Using string color for added text for consistency
  removedText = '#ff5d7a'; // Bright red for removed text

/**
 * Enhanced editor theme styles for Andromeda
 */
const andromedaTheme = EditorView.theme(
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
        color: selectionForeground,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#db45a230',
      outline: `1px solid ${base05}30`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#db45a280',
      color: base01,
      padding: generalSearchField.padding,

      '& span': {
        color: base01,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base06,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base06,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '1px solid #3a3e4c',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '1px solid #3a3e4c',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base06,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#343946',
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
      color: '#748099',
      border: generalGutter.border,
      borderRight: '1px solid #33384550',
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
      color: '#748099',
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base01,
    },

    // Diff/Merge View Styles
    // Inserted/Added Content
    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: addedBackground,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${addedBackground} !important`,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${addedText}40`,
    },
    'ins.cm-insertedLine .cm-changedText': {
      background: 'transparent !important',
    },

    // Deleted/Removed Content
    '.cm-deletedLine': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: removedBackground,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${removedBackground} !important`,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${removedText}40`,
    },
    'del .cm-deletedText, del .cm-changedText': {
      background: 'transparent !important',
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #3a3e4c',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: base03,
        border: 'none',
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: '#db45a240',
        color: base01,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: '#748099',
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: '#748099',
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
        borderLeft: `3px solid ${base07}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base0F}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base07}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}50`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#ff405030',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: '#db45a240',
      outline: `1px solid ${base05}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: base02,
      border: `1px dotted ${base05}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base05}40`,
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
      backgroundColor: '#3b4151',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#4e5568',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#a8aab9',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for the Andromeda theme
 */
const andromedaHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base05, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base05, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base05, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base06 },
  { tag: [t.variableName], color: base06 },
  { tag: [t.propertyName], color: base06, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base07 },
  { tag: [t.className], color: base07, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0E, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0D },
  { tag: [t.bracket], color: base0D },
  { tag: [t.brace], color: base0D },
  { tag: [t.punctuation], color: base0D },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base07 },
  { tag: [t.definition(t.variableName)], color: base06 },

  // Constants and literals
  { tag: t.number, color: base09 },
  { tag: t.changed, color: base09 },
  { tag: t.annotation, color: base0F, fontStyle: 'italic' },
  { tag: t.modifier, color: base0F, fontStyle: 'italic' },
  { tag: t.self, color: base09 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base09 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base08 },
  { tag: [t.special(t.string), t.regexp], color: base08 },
  { tag: t.string, color: base08 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base07, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base0A },
  { tag: t.comment, fontStyle: 'italic', color: base0A },
  { tag: t.docComment, fontStyle: 'italic', color: base0A },

  // HTML/XML elements
  { tag: [t.tagName], color: base0C },
  { tag: [t.attributeName], color: base0F },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0B },
  { tag: [t.strong], fontWeight: 'bold', color: base09 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0E },

  // Links and URLs
  { tag: [t.link], color: base0F, fontWeight: '500', textDecoration: 'underline', textUnderlinePosition: 'under' },
  {
    tag: [t.url],
    color: base0E,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: [t.invalid], color: invalid, textDecoration: 'underline wavy' },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base0D },
  { tag: t.angleBracket, color: base0D },
]);

/**
 * Combined Andromeda theme extension
 */
const andromeda: Extension = [
  andromedaTheme,
  syntaxHighlighting(andromedaHighlightStyle),
];

/**
 * Andromeda merge revert styles configuration
 */
const andromedaMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: '#3a3e4c',
  buttonColor: base06,
  buttonHoverColor: '#343946',
};

export { andromeda, andromedaMergeStyles, applyMergeRevertStyles };