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
 * Enhanced GitHub Light theme color palette
 * ----------------------------------------
 * Colors organized by function with visual color blocks for reference
 */

// Core UI colors
const base00 = '#ffffff', // Background (GitHub light mode background)
base01 = '#24292e', // Foreground (main text color)
base02 = '#BBDFFF', // Selection - light blue
base03 = '#6e7781', // Comments, subdued text
base04 = '#f6f8fa', // Light gray (gutter, panels)
// Syntax highlighting colors
base05 = '#116329', // Tag names - GitHub green
base06 = '#6a737d', // Comments, brackets - GitHub gray
base07 = '#6f42c1', // Classes, properties - GitHub purple
base08 = '#005cc5', // Variables, attributes - GitHub blue
base09 = '#d73a49', // Keywords, types - GitHub red
base0A = '#032f62', // Strings, regexps - GitHub navy
base0B = '#22863a', // Names, quotes - GitHub green
base0C = '#e36209', // Atoms, booleans - GitHub orange
// Background variants
base0D = '#f1f8ff', // Active line gutter background
base0E = '#e1e4e8', // Panel and tooltip border color
base0F = '#f8f9fa'; // Tooltip background

// Special states
const invalid = '#cb2431', // Invalid color - error red
highlightBackground = '#BBDFFF20', // Line highlight (light blue and opacity)
tooltipBackground = base0F, // Tooltip background
cursor = base01, // Caret color
selection = base02, // Selection color
activeBracketBg = '#e8f0fe', // Active bracket background
activeBracketBorder = '#0366d6', // Active bracket border
diagnosticWarning = '#b08800', // Warning color
selectionMatch = '#79b8ff40', // Selection match background
linkColor = '#0969da', // Bright blue for links
visitedLinkColor = '#8250df'; // Purple for visited links

// Diff/merge specific colors
const addedBackground = '#e6ffec80', // GitHub light green with transparency
  removedBackground = '#ffebe980', // GitHub light red with transparency
  addedText = '#0f6d31',         // GitHub dark green for added text
  removedText = '#cf222e';       // GitHub red for removed text

/**
 * Enhanced editor theme styles for GitHub Light
 */
const githubLightTheme = EditorView.theme(
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
        color: base01,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#daebff',
      outline: `1px solid ${base08}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#79b8ff',
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
      backgroundColor: base04,
      color: base03,
      borderRadius: '0 0 4px 4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${base0E}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base0E}`,
    },
    '.cm-panel button': {
      backgroundColor: base00,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#f5f5f5',
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: base04,
      color: base03,
      border: generalGutter.border,
      borderRight: `1px solid ${base0E}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base0D,
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
      border: `1px solid ${addedText}30`,
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
      border: `1px solid ${removedText}30`,
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
        backgroundColor: '#0366d630',
        color: base01,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li:hover': {
        backgroundColor: '#0366d615',
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
      outline: `1px solid ${activeBracketBorder}80`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#ffeef080',
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
      backgroundColor: selectionMatch,
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
      background: base0E,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base01,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base0E}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: base06,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#959da5',
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for GitHub Light theme
 */
const githubLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base09, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base09, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base09, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base08 },
  { tag: [t.variableName], color: base08 },
  { tag: [t.propertyName], color: base07, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base09 },
  { tag: [t.className], color: base07, fontStyle: 'italic' },
  { tag: [t.namespace], color: base08, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base01 },
  { tag: [t.bracket], color: base06 },
  { tag: [t.brace], color: base06 },
  { tag: [t.punctuation], color: base06 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base0B },
  { tag: [t.definition(t.variableName)], color: base08 },

  // Constants and literals
  { tag: t.number, color: base0C },
  { tag: t.changed, color: base0C },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base0C },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0C },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base0B },
  { tag: [t.special(t.string), t.regexp], color: base0A },
  { tag: t.string, color: base0A },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base09, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base06 },
  { tag: t.comment, fontStyle: 'italic', color: base06 },
  { tag: t.docComment, fontStyle: 'italic', color: base06 },

  // HTML/XML elements
  { tag: [t.tagName], color: base05 },
  { tag: [t.attributeName], color: base07 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base08 },
  { tag: [t.strong], fontWeight: 'bold', color: base08 },
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
  { tag: t.constant(t.name), color: base0C },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base06 },
  { tag: t.angleBracket, color: base06 },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base08 },
  { tag: t.quote, color: base06 },
]);

/**
 * Combined GitHub Light theme extension
 */
const githubLight: Extension = [
  githubLightTheme,
  syntaxHighlighting(githubLightHighlightStyle),
];

/**
 * GitHub Light merge revert styles configuration
 */
const githubLightMergeStyles: IMergeRevertStyles = {
  backgroundColor: tooltipBackground,
  borderColor: base0E,
  buttonColor: base01,
  buttonHoverColor: '#f5f5f5',
};

export { githubLight, githubLightMergeStyles, applyMergeRevertStyles };