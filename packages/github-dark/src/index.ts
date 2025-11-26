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
 * Enhanced GitHub Dark theme color definitions
 * -------------------------------------------
 * Colors are organized by function with visual color blocks
 */

// Core UI colors
const base00 = '#0d1117',  // Background (GitHub dark mode background)
  base01 = '#c9d1d9',  // Foreground (main text color)
  base02 = '#264F78',  // Selection - brighter blue for better visibility
  base03 = '#8b949e',  // Comment and Bracket color
  base04 = '#ffffff',  // Caret color (pure white for better visibility,
  // Syntax highlighting colors
  base05 = '#7ee787',  // TagName, Name, Quote - signature GitHub green
  base06 = '#d2a8ff',  // ClassName, PropertyName - GitHub purple
  base07 = '#79c0ff',  // VariableName, Number - GitHub blue
  base08 = '#ff7b72',  // Keyword, TypeName - GitHub red
  base09 = '#a5d6ff',  // String, Meta, Regexp - lighter blue
  base0A = '#2c333a',  // Panel button hover
  base0B = '#3c444d',  // Deleted background color
  base0C = '#ffab70',  // Atom, Bool - GitHub orange
  // Background variants
  base0D = '#161b22',  // Gutter background (slightly darker than the editor)
  base0E = '#30363d',  // Panel and tooltip border color
  base0F = '#21262d';  // Active line gutter background

// UI-specific colors
const invalid = '#f97583',        // Invalid color - error red
  highlightBackground = '#2d333b1a', // Line highlight (GitHub selection color)
  tooltipBackground = '#21262d',   // Tooltip background
  cursor = base04,                 // Caret color
  selection = base02,              // Selection color
  activeBracketBg = '#3a587a75',   // Active bracket background
  activeBracketBorder = '#4d90fe', // Active bracket border
  diagnosticWarning = '#d29922',   // Warning color
  selectionMatch = '#3a587a55',    // Selection match background
  linkColor = '#58a6ff',      // Bright blue for links (GitHub link color)
  visitedLinkColor = '#bc8cff'; // Light purple for visited links

// Diff/merge specific colors
const addedBackground = '#2ea04350', // GitHub green with transparency
  removedBackground = '#f8514940', // GitHub red with transparency
  addedText = '#7ee787',         // GitHub green for added text
  removedText = '#ff7b72';       // GitHub red for removed text

/**
 * Enhanced editor theme styles for GitHub Dark
 */
const githubDarkTheme = EditorView.theme(
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
      backgroundColor: '#3a587a',
      outline: `1px solid ${base07}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: activeBracketBorder,
      color: base04,
      padding: generalSearchField.padding,

      '& span': {
        color: base04,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base01,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: tooltipBackground,
      color: base01,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base0E}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base0E}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base0A,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base0D,
      color: base03,
      border: generalGutter.border,
      borderRight: '1px solid #30363d',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base0F,
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
      border: `1px solid ${base0E}`,
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
      backgroundColor: '#f9758340',
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
      border: `1px dotted ${base0E}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${base00}, 0 0 0 3px ${linkColor}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: base0D,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base0E,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base0D}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base0B,
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
 * Enhanced syntax highlighting for GitHub Dark theme
 */
const githubDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base08, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base08, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base08, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base07 },
  { tag: [t.variableName], color: base07 },
  { tag: [t.propertyName], color: base06, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base08 },
  { tag: [t.className], color: base06, fontStyle: 'italic' },
  { tag: [t.namespace], color: base07, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base01 },
  { tag: [t.bracket], color: base03 },
  { tag: [t.brace], color: base03 },
  { tag: [t.punctuation], color: base03 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base05 },
  { tag: [t.definition(t.variableName)], color: base07 },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0C },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0C },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base05 },
  { tag: [t.special(t.string), t.regexp], color: base09 },
  { tag: t.string, color: base09 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base08, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base05 },
  { tag: [t.attributeName], color: base06 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base07 },
  { tag: [t.strong], fontWeight: 'bold', color: base07 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base09 },

  // Links and URLs
  { tag: [t.link], color: visitedLinkColor, fontWeight: '500', textDecoration: 'underline', textUnderlinePosition: 'under' },
  {
    tag: [t.url],
    color: linkColor,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  // Special states
  { tag: [t.invalid], color: base01, textDecoration: 'underline wavy', borderBottom: `1px wavy ${invalid}` },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: base0C },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base03 },
  { tag: t.angleBracket, color: base03 },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base07 },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined GitHub Dark theme extension
 */
const githubDark: Extension = [
  githubDarkTheme,
  syntaxHighlighting(githubDarkHighlightStyle),
];

/**
 * GitHub Dark merge revert styles configuration
 */
const githubDarkMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base0E,
  buttonColor: base01,
  buttonHoverColor: base0A,
};

export { githubDark, githubDarkMergeStyles, applyMergeRevertStyles };
