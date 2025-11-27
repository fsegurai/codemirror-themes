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
 * High Contrast Dark theme color definitions
 * ------------------------------------------
 * Maximum contrast theme for accessibility
 */

// Base colors - Pure black and white for maximum contrast
const base00 = '#000000', // Background - pure black
  base01 = '#0a0a0a', // Darker background
  base02 = '#1f1f1f', // Selection background
  base03 = '#808080', // Comments - medium grey
  base04 = '#b0b0b0', // Dark grey
  base05 = '#ffffff', // Foreground - pure white
  base06 = '#ffffff', // Light foreground
  base07 = '#ffffff', // Bright white
  // High contrast accent colors
  brightYellow = '#ffff00',
  brightCyan = '#00ffff',
  brightGreen = '#00ff00',
  brightRed = '#ff0000',
  brightMagenta = '#ff00ff',
  brightBlue = '#0099ff',
  brightOrange = '#ff9900',
  brightPurple = '#cc66ff';

// UI specific colors
const invalid = brightRed,
  darkBackground = base00,
  highlightBackground = '#1f1f1f',
  background = base00,
  tooltipBackground = '#1a1a1a',
  selection = '#264f78',
  selectionMatch = '#264f7880',
  cursor = brightYellow,
  activeBracketBg = '#1f1f1f',
  activeBracketBorder = brightCyan,
  diagnosticWarning = brightYellow,
  linkColor = brightCyan,
  visitedLinkColor = brightMagenta;

// Diff/merge specific colors
const addedBackground = '#00550060',
  removedBackground = '#55000060',
  addedText = brightGreen,
  removedText = brightRed;

/**
 * Enhanced editor theme styles for High Contrast Dark
 */
const highContrastDarkTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: base05,
      backgroundColor: background,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
      border: `1px solid ${base04}`,
    },

    // Content and cursor
    '.cm-content': {
      caretColor: cursor,
      lineHeight: generalContent.lineHeight,
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: cursor,
      borderLeftWidth: '3px',
    },
    '.cm-fat-cursor': {
      backgroundColor: cursor,
      color: background,
      border: `2px solid ${base05}`,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: '#3a5a8a',
        outline: `2px solid ${brightCyan}`,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#006400',
      outline: `2px solid ${brightGreen}`,
      color: base05,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base05,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: brightGreen,
      color: base00,
      padding: generalSearchField.padding,
      outline: `2px solid ${base05}`,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      backgroundColor: base01,
      border: `1px solid ${base04}`,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base05,
      borderRadius: '4px',
      border: `1px solid ${base04}`,
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `2px solid ${base04}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `2px solid ${base04}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: brightCyan,
      border: `1px solid ${base04}`,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
      border: `1px solid ${brightCyan}`,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: '#2a2a2aa6',
      borderRadius: generalLine.borderRadius,
      borderLeft: `3px solid ${brightCyan}`,
      borderRight: `1px solid ${base04}`,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: darkBackground,
      color: base04,
      border: generalGutter.border,
      borderRight: `2px solid ${base04}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base02,
      color: brightYellow,
      fontWeight: 'bold',
      border: `1px solid ${base03}`,
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
      color: brightCyan,
    },

    // Diff/Merge View Styles
    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: addedBackground,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${addedText}`,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${addedBackground} !important`,
      color: addedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${addedText}`,
    },
    'ins.cm-insertedLine .cm-changedText': {
      background: 'transparent !important',
    },

    '.cm-deletedLine': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: removedBackground,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${removedText}`,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${removedBackground} !important`,
      color: removedText,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadious,
      border: `1px solid ${removedText}`,
    },
    'del .cm-deletedText, del .cm-changedText': {
      background: 'transparent !important',
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `2px solid ${brightCyan}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      color: base05,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul': {
        backgroundColor: tooltipBackground,
        border: `1px solid ${base04}`,
      },
      '& > ul > li': {
        padding: generalTooltip.padding,
        lineHeight: generalTooltip.lineHeight,
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: selection,
        color: brightYellow,
        borderRadius: generalTooltip.borderRadiusSelected,
        border: `1px solid ${brightCyan}`,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: brightCyan,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: brightYellow,
        fontStyle: 'italic',
      },
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: brightCyan,
      borderBottomColor: brightCyan,
    },

    // Diagnostics styling
    '.cm-diagnostic': {
      '&-error': {
        borderLeft: `4px solid ${brightRed}`,
        backgroundColor: '#33000020',
      },
      '&-warning': {
        borderLeft: `4px solid ${diagnosticWarning}`,
        backgroundColor: '#33330020',
      },
      '&-info': {
        borderLeft: `4px solid ${linkColor}`,
        backgroundColor: '#00333320',
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `3px wavy ${brightRed}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `3px wavy ${diagnosticWarning}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `2px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: '#33000050',
      outline: `2px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `2px solid ${brightCyan}50`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: brightCyan,
      border: `2px solid ${brightCyan}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: `3px solid ${brightCyan}`,
      outlineOffset: '2px',
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: darkBackground,
      border: `1px solid ${base04}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: base04,
      border: `2px solid ${base05}`,
      borderRadius: generalScroller.borderRadius,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: brightCyan,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.7',
      color: base03,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for High Contrast Dark theme
 */
const highContrastDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: brightMagenta, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: brightMagenta, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: brightMagenta, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: brightCyan, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: brightYellow },
  { tag: [t.className], color: brightYellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: brightOrange, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: brightCyan },
  { tag: [t.bracket], color: brightYellow },
  { tag: [t.brace], color: brightCyan },
  { tag: [t.punctuation], color: base05 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: brightBlue },
  { tag: [t.definition(t.function(t.variableName))], color: brightBlue },
  { tag: [t.definition(t.variableName)], color: brightOrange },

  // Constants and literals
  { tag: t.number, color: brightOrange },
  { tag: t.changed, color: brightYellow },
  { tag: t.annotation, color: brightRed, fontStyle: 'italic' },
  { tag: t.modifier, color: brightPurple, fontStyle: 'italic' },
  { tag: t.self, color: brightRed },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: brightOrange,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: brightOrange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: brightGreen },
  { tag: [t.special(t.string), t.regexp], color: brightMagenta },
  { tag: t.string, color: brightGreen },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: brightYellow, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: brightCyan },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: brightMagenta },
  { tag: [t.attributeName], color: brightYellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: brightMagenta },
  { tag: [t.strong], fontWeight: 'bold', color: brightOrange },
  { tag: [t.emphasis], fontStyle: 'italic', color: brightMagenta },

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
    color: brightRed,
    textDecoration: 'underline wavy',
    borderBottom: `2px wavy ${brightRed}`,
  },
  { tag: [t.strikethrough], color: brightRed, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: brightOrange },
  { tag: t.deleted, color: brightRed },
  { tag: t.squareBracket, color: brightYellow },
  { tag: t.angleBracket, color: brightCyan },

  // Additional specific styles
  { tag: t.monospace, color: brightBlue, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: brightPurple },
  { tag: t.quote, color: brightPurple },
]);

/**
 * Combined High Contrast Dark theme extension
 */
const highContrastDark: Extension = [
  highContrastDarkTheme,
  syntaxHighlighting(highContrastDarkHighlightStyle),
];

/**
 * High Contrast Dark merge revert styles configuration
 */
const highContrastDarkMergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: brightCyan,
  buttonColor: brightCyan,
  buttonHoverColor: brightYellow,
};

export { highContrastDark, highContrastDarkMergeStyles, applyMergeRevertStyles };
