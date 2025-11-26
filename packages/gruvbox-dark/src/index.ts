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
 * Enhanced Gruvbox Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const base00 = '#282828', // Background
  base01 = '#3c3836', // Lighter background (popups, statuslines)
  base02 = '#504945', // Selection background
  base03 = '#665c54', // Comments, invisibles, line highlighting
  base04 = '#7c6f64', // Dark foreground (status bars)
  base05 = '#928374', // Comments, invisibles, line highlighting
  // Light/foreground shades
  base06 = '#fbf1c7', // Light foreground (preferbase08)
  base07 = '#ebdbb2', // Light foreground (alternative)
  // Accent colors
  base08 = '#fb4934', // Keywords, storage, operator
  base09 = '#b8bb26', // Strings, tag attributes
  base0A = '#fabd2f', // Functions, tag names
  base0B = '#83a598', // Variables
  base0C = '#d3869b', // Numbers, special constants
  base0D = '#8ec07c', // Types
  base0E = '#fe8019'; // Cursor, constants

// UI specific colors
const invalid = base08,
  darkBackground = base01,
  highlightBackground = '#3c383660', // Line highlight with transparency
  background = base00,
  tooltipBackground = base01,
  selection = base02,
  selectionMatch = '#665c5480', // Selection match background
  cursor = base0E, // Cursor color
  activeBracketBg = '#504945cc', // Active bracket background
  activeBracketBorder = base0A, // Active bracket border
  diagnosticWarning = base0A, // Warning color
  linkColor = base0B, // Link color
  visitedLinkColor = base0C; // Visited link color

// Diff/merge specific colors
const addedBackground = '#32361a80', // Dark base09 with transparency for insertions
  removedBackground = '#3c1f1e80', // Dark base08 with transparency for deletions
  addedText = '#b8bb26',         // Bright base09 for added text
  removedText = '#fb4934';       // Bright base08 for removed text

/**
 * Enhanced editor theme styles for Gruvbox Dark
 */
const gruvboxDarkTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base07,
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
      backgroundColor: '#b57614cc',
      outline: `1px solid ${base0A}`,
      color: base06,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base06,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base0E,
      color: base00,
      padding: generalSearchField.padding,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base07,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: tooltipBackground,
      color: base07,
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
      color: base07,
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
      backgroundColor: base01,
      color: base05,
      border: generalGutter.border,
      borderRight: `1px solid ${base02}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: darkBackground,
      color: base07,
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
      color: base05,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base07,
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
        color: base06,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base05,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base05,
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
      backgroundColor: '#cc241d55',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base03}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: base05,
      border: `1px dotted ${base03}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${base0E}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: base01,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base03,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base01}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base04,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base05,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Gruvbox Dark theme
 */
const gruvboxDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base08, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base08, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base0B },
  { tag: [t.variableName], color: base0B },
  { tag: [t.propertyName], color: base0D, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0D },
  { tag: [t.className], color: base0A, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0B, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base07 },
  { tag: [t.bracket], color: base05 },
  { tag: [t.brace], color: base05 },
  { tag: [t.punctuation], color: base05 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base0A },
  { tag: [t.definition(t.variableName)], color: base0B },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0C },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0E },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0E },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base09 },
  { tag: [t.special(t.string), t.regexp], color: base09 },
  { tag: t.string, color: base09 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0D, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base05 },
  { tag: t.comment, fontStyle: 'italic', color: base05 },
  { tag: t.docComment, fontStyle: 'italic', color: base05 },

  // HTML/XML elements
  { tag: [t.tagName], color: base08 },
  { tag: [t.attributeName], color: base0A },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0A },
  { tag: [t.strong], fontWeight: 'bold', color: base0A },
  { tag: [t.emphasis], fontStyle: 'italic', color: base09 },

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
    color: base07,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0E },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base05 },
  { tag: t.angleBracket, color: base05 },

  // Additional specific styles
  { tag: t.monospace, color: base07 },
  { tag: [t.contentSeparator], color: base0B },
  { tag: t.quote, color: base05 },
]);

/**
 * Combined Gruvbox Dark theme extension
 */
const gruvboxDark: Extension = [
  gruvboxDarkTheme,
  syntaxHighlighting(gruvboxDarkHighlightStyle),
];

/**
 * Gruvbox Dark merge revert styles configuration
 */
const gruvboxDarkMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base03,
  buttonColor: base07,
  buttonHoverColor: base02,
};

export { gruvboxDark, gruvboxDarkMergeStyles, applyMergeRevertStyles };
