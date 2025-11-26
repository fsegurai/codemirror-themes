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
 * Enhanced Nord theme color definitions
 * ------------------------------------
 * Colors organized by function with visual color blocks
 */

// Polar Night
const base00 = '#2e3440', // Background - deep navy blue
  base01 = '#3b4252', // Lighter background (popups, statuslines)
  base02 = '#434c5e', // Selection background
  base03 = '#4c566a', // Comments, invisibles
  // Snow Storm
  base04 = '#d8dee9', // Foreground - light blue-grey
  base05 = '#eceff4', // Light background
  // Frost
  base06 = '#8fbcbb', // Moss green - function names
  base07 = '#88c0d0', // Ice blue - classes, attributes
  base08 = '#81a1c1', // Water blue - methods
  base09 = '#5e81ac', // Deep blue - keywords
  // Aurora
  base0A = '#bf616a', // Red - errors, brackets
  base0B = '#d08770', // Orange - numbers, constants
  base0C = '#ebcb8b', // Yellow - types, classes
  base0D = '#a3be8c', // Green - strings
  base0E = '#b48ead'; // Purple - operators, special characters

// UI specific colors
const invalid = '#d30102', // Bright red for errors
  darkBackground = '#252a33', // Darker background for panels
  highlightBackground = '#3b425277', // Active line highlight with opacity
  background = base00, // Main editor background
  tooltipBackground = base01, // Tooltip background
  selection = base02, // Selection background
  selectionMatch = '#4c566a80', // Selection match with opacity
  cursor = base04, // Cursor color
  activeBracketBg = '#4c566a55', // Active bracket background with opacity
  activeBracketBorder = base07, // Active bracket border - ice blue
  diagnosticWarning = base0C, // Warning color - yellow
  linkColor = base08, // Link color - water blue
  visitedLinkColor = base0E; // Visited link color - purple

// Diff/merge specific colors
const addedBackground = '#3b4a3880', // Dark green with transparency for insertions
  removedBackground = '#4a393a80', // Dark red with transparency for deletions
  addedText = '#a3be8c',         // Nord green for added text
  removedText = '#bf616a';       // Nord red for removed text

/**
 * Enhanced editor theme styles for Nord
 */
const nordTheme = EditorView.theme(
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
      backgroundColor: '#5e81ac80',
      outline: `1px solid ${base06}`,
      color: base04,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base04,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base08,
      color: base05,
      padding: generalSearchField.padding,

      '& span': {
        color: base05,
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
      backgroundColor: base02,
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
      borderRight: `1px solid ${base02}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base01,
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
        backgroundColor: base02,
        color: base05,
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
        borderLeft: `3px solid ${base0A}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${base0A}`,
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
      backgroundColor: `${base0A}40`,
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
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base07}40`,
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
 * Enhanced syntax highlighting for Nord theme
 */
const nordHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base09, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base09, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base09, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base07 },
  { tag: [t.variableName], color: base04 },
  { tag: [t.propertyName], color: base07, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0C },
  { tag: [t.className], color: base0C, fontStyle: 'italic' },
  { tag: [t.namespace], color: base08, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base04 },
  { tag: [t.brace], color: base06 },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base06 },
  { tag: [t.definition(t.function(t.variableName))], color: base06 },
  { tag: [t.definition(t.variableName)], color: base0B },

  // Constants and literals
  { tag: t.number, color: base0B },
  { tag: t.changed, color: base0E },
  { tag: t.annotation, color: base0A, fontStyle: 'italic' },
  { tag: t.modifier, color: base0E, fontStyle: 'italic' },
  { tag: t.self, color: base0E },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0B },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0E },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base06 },
  { tag: [t.special(t.string), t.regexp], color: base0E },
  { tag: t.string, color: base0D },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0C, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base0D },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0A },
  { tag: [t.attributeName], color: base0C },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base08 },
  { tag: [t.strong], fontWeight: 'bold', color: base07 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0C },

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
    borderBottom: `1px wavy ${base0A}`,
  },
  { tag: [t.strikethrough], color: base0A, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0B },
  { tag: t.deleted, color: base0A },
  { tag: t.squareBracket, color: base0A },
  { tag: t.angleBracket, color: base0B },

  // Additional specific styles
  { tag: t.monospace, color: base04, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: base08 },
  { tag: t.quote, color: base0E },
]);

/**
 * Combined Nord theme extension
 */
const nord: Extension = [
  nordTheme,
  syntaxHighlighting(nordHighlightStyle),
];

/**
 * Nord merge revert styles configuration
 */
const nordMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: base03,
  buttonColor: base04,
  buttonHoverColor: base02,
};

export { nord, nordMergeStyles, applyMergeRevertStyles };
