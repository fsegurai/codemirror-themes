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
 * Synthwave '84 theme color definitions
 * -------------------------------------
 * Retro cyberpunk theme with neon colors inspired by 1980s aesthetics
 */

// Base colors
const base00 = '#262335', // Background - deep purple-black
  base01 = '#2a2139', // Darker background
  base02 = '#34294f', // Selection background
  base03 = '#495495', // Comments - muted blue
  base04 = '#848bbd', // Dark foreground
  base05 = '#ffffff', // Foreground - white

  // Neon colors
  neonPink = '#ff7edb',
  neonCyan = '#72f1b8',
  neonYellow = '#fede5d',
  neonOrange = '#f97e72',
  neonPurple = '#b893ce',
  neonBlue = '#36f9f6',
  neonGreen = '#72f1b8',
  neonRed = '#fe4450',
  darkPurple = '#241b2f',
  glowPink = '#ff6ad5',
  glowYellow = '#f3e877';

// UI specific colors
const invalid = neonRed,
  darkBackground = darkPurple,
  highlightBackground = '#2a213955',
  background = base00,
  tooltipBackground = base01,
  selection = base02,
  selectionMatch = '#34294f80',
  cursor = neonPink,
  activeBracketBg = '#34294f88',
  activeBracketBorder = neonCyan,
  diagnosticWarning = neonYellow,
  linkColor = neonBlue,
  visitedLinkColor = neonPurple;

// Diff/merge specific colors
const addedBackground = '#72f1b830',
  removedBackground = '#fe445030',
  addedText = neonGreen,
  removedText = neonRed;

/**
 * Enhanced editor theme styles for Synthwave '84
 */
const synthwave84Theme = EditorView.theme(
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
      boxShadow: `0 0 8px ${cursor}`,
    },
    '.cm-fat-cursor': {
      backgroundColor: `${cursor}99`,
      color: background,
      boxShadow: `0 0 8px ${cursor}`,
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
      backgroundColor: '#36f9f640',
      outline: `1px solid ${neonBlue}`,
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      boxShadow: `0 0 4px ${neonBlue}`,

      '& span': {
        color: base05,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: neonBlue,
      color: base00,
      padding: generalSearchField.padding,
      boxShadow: `0 0 8px ${neonBlue}`,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base05,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base05,
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
      color: neonCyan,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: base02,
      boxShadow: `0 0 8px ${neonCyan}`,
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
      backgroundColor: base02,
      color: neonPink,
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
      color: neonCyan,
    },

    // Diff/Merge View Styles
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
      border: `1px solid ${neonCyan}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: `0 2px 16px ${neonCyan}40`,
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
        color: neonPink,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: neonCyan,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: neonYellow,
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
        borderLeft: `3px solid ${neonRed}`,
      },
      '&-warning': {
        borderLeft: `3px solid ${diagnosticWarning}`,
      },
      '&-info': {
        borderLeft: `3px solid ${linkColor}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${neonRed}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${diagnosticWarning}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
      boxShadow: `0 0 8px ${activeBracketBorder}40`,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${neonRed}40`,
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
      color: neonCyan,
      border: `1px dotted ${neonCyan}70`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${neonPink}40`,
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
      backgroundColor: neonPurple,
      boxShadow: `0 0 8px ${neonPurple}`,
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
 * Enhanced syntax highlighting for Synthwave '84 theme
 */
const synthwave84HighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: neonPink, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: neonPink, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: neonPink, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base05 },
  { tag: [t.variableName], color: base05 },
  { tag: [t.propertyName], color: neonBlue, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: neonYellow },
  { tag: [t.className], color: neonYellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: neonOrange, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: neonCyan },
  { tag: [t.bracket], color: glowYellow },
  { tag: [t.brace], color: glowPink },
  { tag: [t.punctuation], color: base04 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: neonCyan },
  { tag: [t.definition(t.function(t.variableName))], color: neonCyan },
  { tag: [t.definition(t.variableName)], color: neonOrange },

  // Constants and literals
  { tag: t.number, color: neonOrange },
  { tag: t.changed, color: neonYellow },
  { tag: t.annotation, color: neonRed, fontStyle: 'italic' },
  { tag: t.modifier, color: neonPurple, fontStyle: 'italic' },
  { tag: t.self, color: neonRed },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: neonOrange },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: neonOrange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: neonGreen },
  { tag: [t.special(t.string), t.regexp], color: glowPink },
  { tag: t.string, color: neonGreen },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: neonYellow, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: neonCyan },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: neonPink },
  { tag: [t.attributeName], color: neonYellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: neonPink },
  { tag: [t.strong], fontWeight: 'bold', color: neonOrange },
  { tag: [t.emphasis], fontStyle: 'italic', color: neonPink },

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
    color: neonRed,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${neonRed}`,
  },
  { tag: [t.strikethrough], color: neonRed, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: neonOrange },
  { tag: t.deleted, color: neonRed },
  { tag: t.squareBracket, color: glowYellow },
  { tag: t.angleBracket, color: neonCyan },

  // Additional specific styles
  { tag: t.monospace, color: neonBlue, fontStyle: 'italic' },
  { tag: [t.contentSeparator], color: neonPurple },
  { tag: t.quote, color: neonPurple },
]);

/**
 * Combined Synthwave '84 theme extension
 */
const synthwave84: Extension = [
  synthwave84Theme,
  syntaxHighlighting(synthwave84HighlightStyle),
];

/**
 * Synthwave '84 merge revert styles configuration
 */
const synthwave84MergeStyles: IMergeRevertStyles = {
  backgroundColor: darkBackground,
  borderColor: neonCyan,
  buttonColor: neonPink,
  buttonHoverColor: base02,
};

export { synthwave84, synthwave84MergeStyles, applyMergeRevertStyles };

