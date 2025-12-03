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
 * Enhanced Android Studio theme color palette
 * ------------------------------------------
 * Colors refined for better contrast and visual hierarchy
 */

// Base colors
const base00 = '#282b2e', // Background (authentic IntelliJ IDEA dark theme)
  base01 = '#a9b7c6', // Foreground (standard text)
  base02 = '#3f3f3f', // Selection background (slightly darker for contrast)
  base03 = '#3b3b3b', // Gutter background (slightly lighter than the main background)
  base04 = '#606366', // Line numbers (slightly darker for less distraction)
  // Language syntax colors
  base05 = '#cc7832', // Keywords (signature orange)
  base06 = '#6897bb', // Numbers, constants (signature blue)
  base07 = '#9876aa', // Variables (improved purple)
  base08 = '#787878', // Comments (authentic gray)
  base09 = '#bbb529', // Meta, annotations (yellow-green)
  base0A = '#6a8759', // Strings (signature green)
  base0B = '#ffc66d', // Class names, types (warmer gold)
  base0C = '#a9b7c6', // Attribute names (default text color)
  base0D = '#629755', // Function names, docs (forest green)
  base0E = '#d0d0ff', // Brackets, special constructs (soft purple)
  base0F = '#e8bf6a', // Tags (amber)
  base10 = '#3c7abb', // Links (blue)
  base11 = '#50a658', // URLs (green)
  // UI-specific colors
  invalid = '#ff5353', // Error highlighting (more visible)
  cursor = '#ffffff', // Cursor color
  selectionBackground = '#2e5280', // Stronger selection background
  selectionForeground = '#ffffff', // Selection text color
  highlightBackground = '#323232', // Active line highlight
  gutterBackground = '#313335', // Gutter background
  tooltipBackground = base03, // Tooltip background
  activeBracketBg = '#3b514d',
  activeBracketBorder = '#43705c',
  darkBackground = '#313335',
  // Diff/merge specific colors
  addedBackground = '#294436', // Dark green for insertions, matching IntelliJ
  removedBackground = '#484a4a', // Dark gray/red for deletions
  addedText = '#6a8759', // Matching the string color for added text
  removedText = '#cc7832'; // Using the keyword orange for removed text

/**
 * Enhanced editor theme styles for Android Studio
 */
const androidStudioTheme = EditorView.theme(
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
      },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#32593d',
      outline: '1px solid #ffffff',
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: selectionForeground,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#375580',
      color: selectionForeground,
      padding: generalSearchField.padding,

      '& span': {
        color: selectionForeground,
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
      borderBottom: '2px solid #5b5b5b',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '2px solid #5b5b5b',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#404040',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: '#32323221',
      borderRadius: generalLine.borderRadius,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: gutterBackground,
      color: base04,
      border: generalGutter.border,
      borderRight: '1px solid #3f3f3f',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground,
      color: '#c0c0c0',
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
      color: base04,
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
      border: '1px solid #5b5b5b',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: selectionBackground,
        color: selectionForeground,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: base04,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: base04,
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
        borderLeft: `3px solid ${base0F}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base0D}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base0F}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#53383e',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: '#32593d40',
      outline: `1px solid ${base0D}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: '#a1a1a1',
      border: `1px dotted ${base04}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base02}, 0 0 0 4px ${base00}`,
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
      backgroundColor: '#5a5a5a',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${darkBackground}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#6e6e6e',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#a9a9a9',
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for the Android Studio theme
 */
const androidStudioHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base05, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base05, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base05, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base07 },
  { tag: [t.variableName], color: base07 },
  { tag: [t.propertyName], color: base0A, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0B },
  { tag: [t.className], color: base0B, fontStyle: 'italic' },
  { tag: [t.namespace], color: base07, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base05 },
  { tag: [t.bracket], color: base0E },
  { tag: [t.brace], color: base01 },
  { tag: [t.punctuation], color: base01 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base01 },
  { tag: [t.definition(t.variableName)], color: base07 },

  // Constants and literals
  { tag: t.number, color: base06 },
  { tag: t.changed, color: base06 },
  { tag: t.annotation, color: base09, fontStyle: 'italic' },
  { tag: t.modifier, color: base09, fontStyle: 'italic' },
  { tag: t.self, color: base05 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base06 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base05 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0A },
  { tag: [t.special(t.string), t.regexp], color: base0A },
  { tag: t.string, color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0B, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base08 },
  { tag: t.comment, fontStyle: 'italic', color: base08 },
  { tag: t.docComment, fontStyle: 'italic', color: base0D },

  // HTML/XML elements
  { tag: [t.tagName], color: base0F },
  { tag: [t.attributeName], color: base0C },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0B },
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
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base06 },
  { tag: t.deleted, color: invalid },
  { tag: t.labelName, color: base0D },
]);

/**
 * Combined Android Studio theme extension
 */
const androidStudio: Extension = [
  androidStudioTheme,
  syntaxHighlighting(androidStudioHighlightStyle),
];

/**
 * Android Studio merge revert styles configuration
 */
const androidStudioMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: '#5b5b5b',
  buttonColor: base01,
  buttonHoverColor: '#414141',
};

export { androidStudio, androidStudioMergeStyles, applyMergeRevertStyles };
