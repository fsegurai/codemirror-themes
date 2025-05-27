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
} from '@utils';

/**
 * Enhanced color palette for Basic Light theme
 * ----------------------------------------
 * Colors are organized by function with visual color blocks for quick reference
 */

// Text colors (dark shades)
const base00 = '#1c2434'; //  deep navy - primary text (darker for better contrast)
const base01 = '#2d3748'; //  dark slate - secondary text, cursor
const base02 = '#4a5568'; //  medium slate - gutter text
const base03 = '#718096'; //  steel blue - comments, panel text

// Background shades
const base04 = '#edf2f750'; // very light blue w/transparency - active line gutter
const base05 = '#f7fafc'; // off-white - tooltip background
const base06 = '#f0f4f8'; // snow-white - gutter background

// Primary accent colors (cool tones)
const base07 = '#0c7792'; //  teal - links, braces (more saturated)
const base08 = '#0369a1'; //  azure blue - numbers, constants (deeper)
const base09 = '#2b6cb0'; //  royal blue - variables, parameters
const base0A = '#1a365d'; //  deep navy - keywords, headings

// Secondary accent colors (warm and complementary)
const base0B = '#c53030'; //  red - square brackets (more vibrant)
const base0C = '#dd6b20'; //  orange - strings (warmer, more vibrant)
const base0D = '#d69e2e'; //  amber - class names (more saturated)
const base0E = '#2f855a'; //  green - operators (deeper, richer)
const base0F = '#805ad5'; //  purple - tag names (more vibrant)

// UI-specific colors
const invalid = '#e53e3e'; //  bright red - errors (more visible)
const darkBackground = base06; // panel background
const highlightBackground = '#ebf4ff40'; // active line highlight (subtle blue)
const background = '#ffffff'; // editor background
const tooltipBackground = base05; // tooltip background
const selection = '#90cdf480'; // selection background (clearer blue)
const selectionMatch = '#63b3ed40'; // selection match highlight
const cursor = base01; //  cursor color
const activeBracketBg = '#0c779220';
const activeBracketBorder = base09;

/**
 * Enhanced editor theme styles for Basic Light
 */
export const basicLightTheme = EditorView.theme(
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
      color: background,
    },

    // Selection
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: selection,
        color: base0A,
      },

    // Make sure selection appears above active line
    '.cm-selectionLayer': {
      zIndex: 100,
    },

    // Search functionality
    '.cm-searchMatch': {
      backgroundColor: '#63b3ed40',
      outline: `1px solid ${base09}`,
      color: base00,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: base00,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#63b3ed70',
      color: base00,
      padding: generalSearchField.padding,

      '& span': {
        color: base00,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: base02,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: darkBackground,
      color: base03,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '1px solid #e2e8f0',
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: '1px solid #e2e8f0',
    },
    '.cm-panel button': {
      backgroundColor: darkBackground,
      color: base02,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: '#e2e8f0',
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
      color: base02,
      border: generalGutter.border,
      borderRight: '1px solid #e2e8f0',
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: base04,
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
      color: base02,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: base00,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: '1px solid #e2e8f0',
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
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
        backgroundColor: '#0c779220',
        color: base00,
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
        borderLeft: `3px solid ${base0D}`,
      },
      '&-info': {
        borderLeft: `3px solid ${base07}`,
      },
    },
    '.cm-lintPoint-error': {
      borderBottom: `2px wavy ${invalid}`,
    },
    '.cm-lintPoint-warning': {
      borderBottom: `2px wavy ${base0D}`,
    },

    // Matching brackets
    '.cm-matchingBracket': {
      backgroundColor: activeBracketBg,
      outline: `1px solid ${activeBracketBorder}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: `${invalid}20`,
      outline: `1px solid ${invalid}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Selection matches
    '.cm-selectionMatch': {
      backgroundColor: selectionMatch,
      outline: `1px solid ${base09}30`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      color: base03,
      border: `1px dotted ${base09}50`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${background}, 0 0 0 3px ${base09}30`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: base06,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: '#cbd5e0',
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${base06}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#a0aec0',
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: '#718096',
    },
  },
  { dark: false },
);

/**
 * Enhanced syntax highlighting for the Basic Light theme
 */
export const basicLightHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: base0A, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: base0A, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: base0A, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: base09 },
  { tag: [t.variableName], color: base09 },
  { tag: [t.propertyName], color: base09, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: base0D },
  { tag: [t.className], color: base0D, fontStyle: 'italic' },
  { tag: [t.namespace], color: base09, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: base0E },
  { tag: [t.bracket], color: base07 },
  { tag: [t.brace], color: base07 },
  { tag: [t.punctuation], color: base07 },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: base08 },
  { tag: [t.definition(t.variableName)], color: base09 },

  // Constants and literals
  { tag: t.number, color: base08 },
  { tag: t.changed, color: base08 },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: base08, fontStyle: 'italic' },
  { tag: t.self, color: base08 },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: base0A },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: base07 },
  { tag: [t.special(t.string), t.regexp], color: base0B },
  { tag: t.string, color: base0C },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: base0D, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: base08 },
  { tag: t.comment, fontStyle: 'italic', color: base03 },
  { tag: t.docComment, fontStyle: 'italic', color: base03 },

  // HTML/XML elements
  { tag: [t.tagName], color: base0F },
  { tag: [t.attributeName], color: base0D },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: base08 },
  { tag: [t.strong], fontWeight: 'bold', color: base09 },
  { tag: [t.emphasis], fontStyle: 'italic', color: base0A },

  // Links and URLs
  {
    tag: [t.link],
    color: base07,
    fontWeight: '500',
    textDecoration: 'underline',
    textUnderlinePosition: 'under',
  },
  {
    tag: [t.url],
    color: base0C,
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
  { tag: t.constant(t.name), color: base0A },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: base0B },
  { tag: t.angleBracket, color: base0C },

  // Additional specific styles
  { tag: t.heading1, fontWeight: 'bold', color: base08 },
  { tag: t.special(t.heading1), fontWeight: 'bold', color: base08 },
  {
    tag: [t.heading2, t.heading3, t.heading4],
    fontWeight: 'bold',
    color: base08,
  },
  { tag: [t.heading5, t.heading6], color: base08 },
  { tag: t.monospace, color: base00 },
  { tag: [t.contentSeparator], color: base0D },
  { tag: t.quote, color: base01 },
]);

/**
 * Combined Basic Light theme extension
 */
export const basicLight: Extension = [
  basicLightTheme,
  syntaxHighlighting(basicLightHighlightStyle),
];
