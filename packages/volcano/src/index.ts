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
 * Enhanced Volcano theme color definitions
 * ---------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#390000', // Background
  base01 = '#F8F8F8', // Foreground
  base02 = '#750000', // Selection background
  base03 = '#e7c0c0', // Comments, invisibles
  base04 = '#970000', // Cursor
  base05 = '#f12727', // Default foreground
  base06 = '#580000', // Dark background for panels
  base07 = '#4a0000', // Darker background (gutter)
  // Accent colors
  base08 = '#ec0d1e', // Errors, invalid
  base09 = '#aa5507', // Numbers, constants
  base0A = '#fec758', // Classes, attributes
  base0B = '#9df39f', // Success
  base0C = '#7df3f7', // Functions, parameters
  base0D = '#7dcaf7', // Variables
  base0E = '#c27df7', // Keywords, operators
  base0F = '#f77dca'; // Special characters

// UI specific colors
const invalid = '#ffffff',
  darkBackground = base06,
  highlightBackground = '#ff000035', // Line highlight with transparency
  background = base00,
  tooltipBackground = '#680000',
  selection = '#75000080', // Selection background with transparency
  selectionMatch = '#7500009a', // Selection match with transparency
  cursor = base04, // Cursor color
  activeBracketBg = '#ff550040', // Active bracket background with transparency
  activeBracketBorder = base08, // Active bracket border
  diagnosticWarning = base09, // Warning color
  linkColor = base0C, // Link color
  visitedLinkColor = base0E; // Visited link color

// Diff/merge specific colors
const addedBackground = '#2a4a0080', // Dark green with transparency for insertions
  removedBackground = '#750000a0', // Dark red with transparency for deletions
  addedText = '#9df39f',         // Volcano green for added text
  removedText = '#ec0d1e';       // Volcano red for removed text

/**
 * Enhanced editor theme styles for Volcano
 */
const volcanoTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base01,
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
      backgroundColor: '#75000080',
      outline: `1px solid ${base08}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base08,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: base01,
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
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `2px solid ${base00}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `2px solid ${base00}`,
    },
    '.cm-panel button': {
      backgroundColor: base07,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
      boxShadow: '0 0 4px #ff550080',
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
      borderRight: `1px solid ${base06}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#550000',
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
      border: `1px solid ${base08}60`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
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
        backgroundColor: base02,
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
        borderLeft: `3px solid ${base08}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${base08}`,
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
      backgroundColor: `${base08}40`,
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
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base08}70`,
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
      backgroundColor: base02,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base07}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base08,
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
 * Enhanced syntax highlighting for Volcano theme
 */
const volcanoHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base05, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base05, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base05, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base01 },
  { tag: [t.variableName], color: base0A },
  { tag: [t.propertyName], color: base0C, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0B },
  { tag: [t.className], color: base0A, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0D, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName)], color: base0C },
  { tag: [t.labelName], color: base0C, fontStyle: 'italic' },
  { tag: [t.definition(t.function(t.variableName))], color: base0C },
  { tag: [t.definition(t.variableName)], color: base0A },

  // Constants and literals
  { tag: t.number, color: base09 },
  { tag: t.changed, color: base09 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base09, fontStyle: 'italic' },
  { tag: t.self, color: base09 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: base09,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base09 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.special(t.string), t.regexp], color: base0F },
  { tag: t.string, color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0B, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base01 },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base08 },
  { tag: [t.attributeName], color: base0A },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base09 },
  { tag: t.heading1, color: base08, fontWeight: 'bold' },
  { tag: t.heading2, color: base09 },
  { tag: t.heading3, color: base0A },
  { tag: t.heading4, color: base0B },
  { tag: t.heading5, color: base0C },
  { tag: t.heading6, color: base0D },
  { tag: [t.strong], fontWeight: 'bold', color: base01 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0A },

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
  { tag: t.constant(t.name), color: base09 },
  { tag: t.deleted, color: base08 },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base0D },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Volcano theme extension
 */
const volcano: Extension = [
  volcanoTheme,
  syntaxHighlighting(volcanoHighlightStyle),
];

/**
 * Volcano merge revert styles configuration
 */
const volcanoMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base07,
  buttonColor: base01,
  buttonHoverColor: base08,
};

export { volcano, volcanoMergeStyles, applyMergeRevertStyles };
