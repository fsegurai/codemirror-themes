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
 * Enhanced Gruvbox Light theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const base00 = '#3c3836', // Main foreground (text)
  base01 = '#504945', // Secondary foreground
  base02 = '#665c54', // Tertiary foreground
  base03 = '#7c6f64', // Quaternary foreground
  base04 = '#928374', // Comments, invisibles, line highlighting
  // Light/background shades
  base05 = '#fbf1c7', // Main background
  base06 = '#ebdbb2', // Secondary background
  base07 = '#d5c4a1', // Tertiary background (not defined above)
  base08 = '#bdae93', // Quaternary background
  base09 = '#a89984', // Quinary background (not defined above)
  // Accent colors
  base0A = '#9d0006', // Keywords, storage, operator
  base0B = '#79740e', // Strings, tag attributes
  base0C = '#b57614', // Functions, tag names
  base0D = '#076678', // Variables
  base0E = '#8f3f71', // Numbers, special constants
  base0F = '#427b58', // Types
  base10 = '#af3a03'; // Cursor, constants

// UI specific colors
const invalid = base0A,
  darkBackground = base06,
  highlightBackground = '#ffc42e25', // Line highlight with transparency
  background = base05,
  tooltipBackground = base06,
  selection = darkBackground,
  selectionMatch = '#ffc42e40', // Selection match background
  cursor = base10, // Cursor color
  activeBracketBg = '#d5c4a180', // Active bracket background
  activeBracketBorder = base10, // Active bracket border
  diagnosticWarning = base0C, // Warning color
  linkColor = base0D, // Link color
  visitedLinkColor = base0E; // Visited link color

// Diff/merge specific colors
const addedBackground = '#d8e5bc80', // Light base0B with transparency for insertions
  removedBackground = '#f7cfcf80', // Light base0A with transparency for deletions
  addedText = '#79740e',         // Gruvbox base0B for added text
  removedText = '#9d0006';       // Gruvbox base0A for removed text

/**
 * Enhanced editor theme styles for Gruvbox Light
 */
const gruvboxLightTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base00,
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
      color: base05,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
        color: base00,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#ffc42e80',
      outline: `1px solid ${base10}`,
      color: base00,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base00,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base10,
      color: base05,
      padding: generalSearchField.padding,

      '& span': {
        color: base05,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base00,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: base06,
      color: base01,
      borderRadius: '0 0 4px 4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base08}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base08}`,
    },
    '.cm-panel button': {
      backgroundColor: base05,
      color: base00,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base07,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base06,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base08}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base07,
      color: base00,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: base03,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base00,
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
      border: `1px solid ${base08}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
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
        backgroundColor: base10 + '30',
        color: base00,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li:hover': {
        backgroundColor: base10 + '15',
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
      backgroundColor: '#fb492740',
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base08}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: base02,
      border: `1px dotted ${base08}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base05}, 0 0 0 3px ${base10}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: base05,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base08,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base05}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base09,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: base04,
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for Gruvbox Light theme
 */
const gruvboxLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0A, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0A, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0A, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base0D },
  { tag: [t.variableName], color: base0D },
  { tag: [t.propertyName], color: base0F, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0F },
  { tag: [t.className], color: base0C, fontStyle: 'italic' },
  { tag: [t.namespace], color: base0D, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base00 },
  { tag: [t.bracket], color: base04 },
  { tag: [t.brace], color: base04 },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base0C },
  { tag: [t.definition(t.variableName)], color: base0D },

  // Constants and literals
  { tag: t.number, color: base0E },
  { tag: t.changed, color: base0E },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0E, fontStyle: 'italic' },
  { tag: t.self, color: base0E },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base10 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base10 },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.special(t.string), t.regexp], color: base0B },
  { tag: t.string, color: base0B },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0F, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base04 },
  { tag: t.comment, fontStyle: 'italic', color: base04 },
  { tag: t.docComment, fontStyle: 'italic', color: base04 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0A },
  { tag: [t.attributeName], color: base0C },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base0C },
  { tag: [t.strong], fontWeight: 'bold', color: base0C },
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
    color: base00,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base10 },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base04 },
  { tag: t.angleBracket, color: base04 },

  // Additional specific styles
  { tag: t.monospace, color: base00 },
  { tag: [t.contentSeparator], color: base0D },
  { tag: t.quote, color: base04 },
]);

/**
 * Combined Gruvbox Light theme extension
 */
const gruvboxLight: Extension = [
  gruvboxLightTheme,
  syntaxHighlighting(gruvboxLightHighlightStyle),
];

/**
 * Gruvbox Light merge revert styles configuration
 */
const gruvboxLightMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base08,
  buttonColor: base00,
  buttonHoverColor: base07,
};

export { gruvboxLight, gruvboxLightMergeStyles, applyMergeRevertStyles };