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
 * Enhanced Tokyo Night Storm theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#24283b', // Background
  // const base01 = '#7982a9'; // Foreground
  base02 = '#414868', // Selection background
  base03 = '#565f89', // Comments, invisible
  base04 = '#c0caf5', // Default foreground (bright blue)
  base05 = '#282e44', // Dark background for panels
  base06 = '#1f2335', // Darker background (gutter)
  // Accent colors
  base07 = '#f7768e', // Errors, invalid
  base08 = '#ff9e64', // Numbers, constants
  base09 = '#e0af68', // Classes, attributes
  base0A = '#9ece6a', // Strings, success
  base0B = '#2ac3de', // Types, parameter
  base0C = '#7aa2f7', // Functions, properties
  base0D = '#bb9af7'; // Keywords, operators

// UI specific colors
const invalid = '#f7768e',
  darkBackground = base06,
  highlightBackground = '#292e427a', // Line highlight with transparency
  background = base00,
  tooltipBackground = base05,
  selection = '#6f7bb630', // Selection background with transparency
  selectionMatch = '#6f7bb650', // Selection match with transparency
  cursor = base04, // Cursor color
  activeBracketBg = '#3d59a150', // Active bracket background with transparency
  activeBracketBorder = base0C, // Active bracket border
  diagnosticWarning = base08, // Warning color
  linkColor = base0B, // Link color
  visitedLinkColor = base0D; // Visited link color

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80', // Dark red with transparency for deletions
  addedText = '#9ece6a',         // Tokyo Night Storm green for added text
  removedText = '#f7768e';       // Tokyo Night Storm red for removed text

/**
 * Enhanced editor theme styles for Tokyo Night Storm
 */
const tokyoNightStormTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base04,
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
      outline: `1px solid ${base0C}`,
      color: base04,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base0C,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: background,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base04,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base05,
      color: base04,
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
      color: base04,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base06,
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
      borderRight: `1px solid ${base06}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base06,
      color: base04,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
      lineHeight: generalGutter.lineHeight,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
      lineHeight: generalGutter.lineHeight,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base03,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base04,
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
        color: base04,
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
      backgroundColor: `${base07}20`,
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
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base0C}40`,
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
const tokyoNightStormHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0D, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0D, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0D, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base04 },
  { tag: [t.variableName], color: base04 },
  { tag: [t.propertyName], color: base0C, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0B },
  { tag: [t.className], color: base09, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0C, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0D },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base0C },
  { tag: [t.labelName], color: base0C, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base0C },
  { tag: [t.definition(t.variableName)], color: base04 },

  // Constants and literals
  { tag: t.number, color: base08 },
  { tag: t.changed, color: base08 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base08, fontStyle: 'italic' },
  { tag: t.self, color: base08 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base0D,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base08 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0A },
  { tag: [t.special(t.string), t.regexp], color: '#b4f9f8' },
  { tag: t.string, color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0B, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base04 },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0D },
  { tag: [t.attributeName], color: base09 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: '#89ddff' },
  { tag: t.heading1, color: '#89ddff', fontWeight: 'bold' },
  { tag: t.heading2, color: '#89ddff' },
  { tag: t.heading3, color: '#89ddff' },
  { tag: t.heading4, color: '#89ddff' },
  { tag: t.heading5, color: '#89ddff' },
  { tag: t.heading6, color: '#89ddff' },
  { tag: [t.strong], fontWeight: 'bold', color: base04 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0B },

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
    color: base04,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base08 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  // Additional specific styles
  { tag: t.monospace, color: base04 },
  { tag: [t.contentSeparator], color: base0C },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Tokyo Night Storm theme extension
 */
const tokyoNightStorm: Extension = [
  tokyoNightStormTheme,
  syntaxHighlighting(tokyoNightStormHighlightStyle),
];

/**
 * Tokyo Night Storm merge revert styles configuration
 */
const tokyoNightStormMergeStyles: IMergeRevertStyles = {
  backgroundColor: base05,
  borderColor: base03,
  buttonColor: base04,
  buttonHoverColor: base02,
};

export { tokyoNightStorm, tokyoNightStormMergeStyles, applyMergeRevertStyles };
