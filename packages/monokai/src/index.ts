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
 * Enhanced Monokai theme color definitions
 * -------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#272822', // Background
  base01 = '#f8f8f2', // Foreground
  base02 = '#88846f', // Comments, invisibles
  base03 = '#f8f8f0', // Cursor
  // Accent colors
  base04 = '#F92672', // Keyword, Storage, Tag - Pink
  base05 = '#FD971F', // Variable, Parameter - Orange
  base06 = '#66D9EF', // Function, Type - Blue
  base07 = '#E6DB74', // String, RegExp - Yellow
  base08 = '#AE81FF', // Constant, Number - Purple
  base09 = '#A6E22E'; // Class, Heading - Green

// UI specific colors
const invalid = '#F44747', // Error color - Red
  darkBackground = '#414339', // Gutter background
  highlightBackground = '#3e3d3257', // Line highlight with opacity
  tooltipBackground = '#34352f', // Tooltip background - Slightly lighter than base00
  selection = '#49483E', // Selection background
  selectionMatch = '#75715e70', // Selection match with opacity
  cursor = base03, // Cursor color
  activeBracketBg = '#75715E55', // Active bracket background with opacity
  activeBracketBorder = base06, // Active bracket border - blue
  diagnosticWarning = base05, // Warning color - orange
  linkColor = base06, // Link color - blue
  visitedLinkColor = base08; // Visited link color - purple

// Diff/merge specific colors
const addedBackground = '#3d4d3880', // Dark green with transparency for insertions
  removedBackground = '#4d393980', // Dark red with transparency for deletions
  addedText = '#A6E22E',         // Monokai green for added text
  removedText = '#F92672';       // Monokai pink/red for removed text

/**
 * Enhanced editor theme styles for Monokai
 */
const monokaiTheme = EditorView.theme(
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

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#49483E99',
      outline: `1px solid ${base07}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base04,
      color: base00,
      padding: generalSearchField.padding,

      '& span': {
        color: base00,
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
      borderBottom: `1px solid ${base02}80`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base02}80`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#49483E',
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
      color: base02,
      border: generalGutter.border,
      borderRight: '1px solid #3e3d32',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#35352c',
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
      color: base02,
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
      border: '1px solid #49483E',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
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
        color: base02,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base02,
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
      backgroundColor: '#f9267240',
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
      color: base02,
      border: `1px dotted ${base02}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base06}40`,
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
      backgroundColor: '#49483E',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#5a594d',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base02,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Monokai theme
 */
const monokaiHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base04, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base04, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base04, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: base09, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base06, fontStyle: 'italic' },
  { tag: [t.className], color: base09, fontStyle: 'italic' },
  { tag: [t.namespace], color: base05, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base04 },
  { tag: [t.bracket], color: base01 },
  { tag: [t.brace], color: base01 },
  { tag: [t.punctuation], color: base01 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base06 },
  { tag: [t.definition(t.function(t.variableName))], color: base06 },
  { tag: [t.definition(t.variableName)], color: base05 },

  // Constants and literals
  { tag: t.number, color: base08 },
  { tag: t.changed, color: base08 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base08, fontStyle: 'italic' },
  { tag: t.self, color: base08 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base08 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base08 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base09 },
  { tag: [t.special(t.string), t.regexp], color: base07 },
  { tag: t.string, color: base07 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base06, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base02 },
  { tag: t.comment, fontStyle: 'italic', color: base02 },
  { tag: t.docComment, fontStyle: 'italic', color: base02 },

  // HTML/XML elements
  { tag: [t.tagName], color: base04 },
  { tag: [t.attributeName], color: base09 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base09 },
  { tag: [t.strong], fontWeight: 'bold', color: base05 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base05 },

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
  { tag: t.constant(t.name), color: base08 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base01 },
  { tag: t.angleBracket, color: base01 },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base05 },
  { tag: t.quote, color: base02 },
]);

/**
 * Combined Monokai theme extension
 */
const monokai: Extension = [
  monokaiTheme,
  syntaxHighlighting(monokaiHighlightStyle),
];

/**
 * Monokai merge revert styles configuration
 */
const monokaiMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: base02,
  buttonColor: base01,
  buttonHoverColor: selection,
};

export { monokai, monokaiMergeStyles, applyMergeRevertStyles };
