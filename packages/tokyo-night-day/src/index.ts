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
 * Enhanced Tokyo Night Day theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#e1e2e7', // Background
  base01 = '#3760bf', // Primary foreground
  base02 = '#99a7df', // Selection background
  base03 = '#848cb5', // Comments, invisibles
  base04 = '#8c91a8', // Dark foreground (status)
  base05 = '#3760bf', // Default foreground
  base06 = '#e9e9ec', // Light background
  base07 = '#d5d6db', // Light background (gutter)
  // Accent colors
  base_red = '#f52a65', // Errors, invalid
  base_orange = '#b15c00', // Numbers, constants
  base_yellow = '#8c6c3e', // Classes, attributes
  base_green = '#587539', // Strings, success
  base_cyan = '#007197', // Functions, keywords
  base_blue = '#2e7de9', // Variables, parameters
  base_purple = '#7847bd', // Operators, tags
  base_magenta = '#9854f1'; // Special characters

// UI specific colors
const invalid = base_red,
  darkBackground = base07,
  highlightBackground = '#5F5FAF5A', // Line highlight with improved transparency
  background = base00,
  tooltipBackground = base06,
  selection = '#99a7df40', // Selection background with transparency
  selectionMatch = '#99a7df60', // Selection match with transparency
  cursor = base01, // Cursor color
  activeBracketBg = '#0e639c20', // Active bracket background with transparency
  activeBracketBorder = base_cyan, // Active bracket border
  diagnosticWarning = base_orange, // Warning color
  linkColor = base_cyan, // Link color
  visitedLinkColor = base_purple; // Visited link color

// Diff/merge specific colors
const addedBackground = '#58753920', // Green with transparency for insertions
  removedBackground = '#f52a6520', // Red with transparency for deletions
  addedText = '#587539',         // Tokyo Night Day green for added text
  removedText = '#f52a65';       // Tokyo Night Day red for removed text

/**
 * Enhanced editor theme styles for Tokyo Night Day
 */
const tokyoNightDayTheme = EditorView.theme(
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
      backgroundColor: '#0e639c40',
      outline: `1px solid ${base_cyan}`,
      color: base05,
      borderRadius: generalSearchField.borderRadius,
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
      backgroundColor: base06,
      color: base05,
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base03}30`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base03}30`,
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
      border: `1px solid ${base02}`,
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
      // backgroundColor: '#CFD0D608)',
      color: base01,
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
      border: `1px solid ${base04}40`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: 'none',
        maxHeight: '300px',
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
      backgroundColor: base03,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
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
 * Enhanced syntax highlighting for Tokyo Night Day theme
 */
const tokyoNightDayHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base_cyan, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base_cyan, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base_cyan, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base_blue },
  { tag: [t.variableName], color: base01 },
  { tag: [t.propertyName], color: base_blue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base_cyan },
  { tag: [t.className], color: base_yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: base_purple, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base_purple },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base_cyan },
  { tag: [t.labelName], color: base_purple, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base_cyan },
  { tag: [t.definition(t.variableName)], color: base_blue },

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
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base_orange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base_green },
  { tag: [t.special(t.string), t.regexp], color: base_magenta },
  { tag: t.string, color: base_green },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base_cyan, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base_blue },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base_purple },
  { tag: [t.attributeName], color: base_yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base_orange },
  { tag: t.heading1, color: base_orange, fontWeight: 'bold' },
  { tag: t.heading2, color: base_orange },
  { tag: t.heading3, color: base_orange },
  { tag: t.heading4, color: base_cyan },
  { tag: t.heading5, color: base_cyan },
  { tag: t.heading6, color: base_cyan },
  { tag: [t.strong], fontWeight: 'bold', color: base01 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base_green },

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
    color: base01,
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
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base_blue },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Tokyo Night Day theme extension
 */
const tokyoNightDay: Extension = [
  tokyoNightDayTheme,
  syntaxHighlighting(tokyoNightDayHighlightStyle),
];

/**
 * Tokyo Night Day merge revert styles configuration
 */
const tokyoNightDayMergeStyles: IMergeRevertStyles = {
  backgroundColor: base07,
  borderColor: base03,
  buttonColor: base01,
  buttonHoverColor: selectionMatch,
};

export { tokyoNightDay, tokyoNightDayMergeStyles, applyMergeRevertStyles };
