import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

import {
  generalContent,
  generalCursor,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
} from '../../.helper/utils';

/**
 * Enhanced Palenight theme color definitions
 * ---------------------------------------
 * Colors organized by function with visual color blocks
 */

// Base colors
const base00 = '#292D3E'; // Background - deep indigo
const base01 = '#A6ACCD'; // Foreground - lavender blue
const base02 = '#444267'; // Selection background - muted indigo
const base03 = '#676E95'; // Comments, invisible - steel blue
const base04 = '#BFC7D5'; // Cursor - lighter lavender

// Accent colors
const base05 = '#C3E88D'; // Strings - light green
const base06 = '#82AAFF'; // Keywords, Functions - sky blue
const base07 = '#C792EA'; // Classes, Types - purple
const base08 = '#F78C6C'; // Numbers, Constants - orange
const base09 = '#FFCB6B'; // Classes, Attributes - yellow
const base0A = '#89DDFF'; // Punctuation, Operators - light blue
const base0B = '#FF5370'; // Tags, Errors - red
const base0C = '#BB80B3'; // Special elements - mauve
const base0D = '#80CBC4'; // Properties - seafoam

// UI specific colors
const invalid = '#FF5370'; // Error color - red
const darkBackground = '#202331'; // Darker background for panels and gutter
const highlightBackground = '#2e324817'; // Active line background
const background = base00; // Main editor background
const tooltipBackground = '#343A50'; // Tooltip background
const selection = base02; // Selection background
const selectionMatch = '#444267AA'; // Selection match with opacity
const cursor = base04; // Cursor color
const activeBracketBg = '#2E3248'; // Active bracket background
const activeBracketBorder = base06; // Active bracket border - sky blue
const diagnosticWarning = base09; // Warning color - yellow
const linkColor = base06; // Link color - sky blue
const visitedLinkColor = base07; // Visited link color - purple

/**
 * Enhanced editor theme styles for Palenight
 */
export const palenightTheme = EditorView.theme(
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
      backgroundColor: '#444267CC',
      outline: `1px solid ${base06}`,
      color: base01,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base01,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base06,
      color: background,
      padding: generalSearchField.padding,

      '& span': {
        color: background,
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
      borderBottom: `1px solid ${base02}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${base02}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: base01,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#3A4058',
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
      borderRight: '1px solid #3A405880',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: '#2A2D40',
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

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #3A4058',
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
      backgroundColor: `${invalid}40`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base03}50`,
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
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base06}40`,
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
      backgroundColor: '#515580',
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
 * Enhanced syntax highlighting for Palenight theme
 */
export const palenightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base06, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base06, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base06, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base01 },
  { tag: [t.variableName], color: base01 },
  { tag: [t.propertyName], color: base0D, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base07 },
  { tag: [t.className], color: base09, fontStyle: 'italic' },
  { tag: [t.namespace], color: base09, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0A },
  { tag: [t.bracket], color: base0A },
  { tag: [t.brace], color: base0A },
  { tag: [t.punctuation], color: base0A },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base06 },
  { tag: [t.definition(t.function(t.variableName))], color: base06 },
  { tag: [t.definition(t.variableName)], color: base08 },

  // Constants and literals
  { tag: t.number, color: base08 },
  { tag: t.changed, color: base08 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base0C, fontStyle: 'italic' },
  { tag: t.self, color: base07 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base08 },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base05 },
  { tag: [t.special(t.string), t.regexp], color: base05 },
  { tag: t.string, color: base05 },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base07, fontWeight: 'bold' },
  { tag: [t.definition(t.name), t.separator], color: base0A },

  // Comments and documentation
  { tag: t.meta, color: base03 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0B },
  { tag: [t.attributeName], color: base09 },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base09 },
  { tag: [t.strong], fontWeight: 'bold', color: base09 },
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
  { tag: t.squareBracket, color: base0A },
  { tag: t.angleBracket, color: base0A },

  // Additional specific styles
  { tag: t.monospace, color: base01 },
  { tag: [t.contentSeparator], color: base09 },
  { tag: t.quote, color: base03 },
]);

/**
 * Combined Palenight theme extension
 */
export const palenight: Extension = [
  palenightTheme,
  syntaxHighlighting(palenightHighlightStyle),
];
