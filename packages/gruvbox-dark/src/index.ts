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
 * Enhanced Gruvbox Dark theme color definitions
 * --------------------------------------------
 * Colors organized by function with visual color blocks
 */

// Gruvbox base colors
const dark0 = '#282828'; // Background
const dark1 = '#3c3836'; // Lighter background (popups, statuslines)
const dark2 = '#504945'; // Selection background
const dark3 = '#665c54'; // Comments, invisibles, line highlighting
const dark4 = '#7c6f64'; // Dark foreground (status bars)
const gray_245 = '#928374'; // Comments, invisibles, line highlighting

// Light/foreground shades
const light0 = '#fbf1c7'; // Light foreground (preferred)
const light1 = '#ebdbb2'; // Light foreground (alternative)

// Accent colors
const bright_red = '#fb4934'; // Keywords, storage, operator
const bright_green = '#b8bb26'; // Strings, tag attributes
const bright_yellow = '#fabd2f'; // Functions, tag names
const bright_blue = '#83a598'; // Variables
const bright_purple = '#d3869b'; // Numbers, special constants
const bright_aqua = '#8ec07c'; // Types
const bright_orange = '#fe8019'; // Cursor, constants

// Simplified naming
const bg0 = dark0;
const bg1 = dark1;
const bg2 = dark2;
const bg3 = dark3;
const bg4 = dark4;
const gray = gray_245;
const fg0 = light0;
const fg1 = light1;
const red = bright_red;
const green = bright_green;
const yellow = bright_yellow;
const blue = bright_blue;
const purple = bright_purple;
const aqua = bright_aqua;
const orange = bright_orange;

// UI specific colors
const invalid = red;
const darkBackground = bg1;
const highlightBackground = '#3c383660'; // Line highlight with transparency
const background = bg0;
const tooltipBackground = bg1;
const selection = bg2;
const selectionMatch = '#665c5480'; // Selection match background
const cursor = orange; // Cursor color
const activeBracketBg = '#504945cc'; // Active bracket background
const activeBracketBorder = yellow; // Active bracket border
const diagnosticWarning = yellow; // Warning color
const linkColor = blue; // Link color
const visitedLinkColor = purple; // Visited link color

/**
 * Enhanced editor theme styles for Gruvbox Dark
 */
export const gruvboxDarkTheme = EditorView.theme(
  {
    // Base editor styles
    '&': {
      color: fg1,
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
      color: bg0,
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
      outline: `1px solid ${yellow}`,
      color: fg0,
      borderRadius: generalSearchField.borderRadius,

      '& span': {
        color: fg0,
      },
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: orange,
      color: bg0,
      padding: generalSearchField.padding,

      '& span': {
        color: bg0,
      },
    },
    '.cm-search.cm-panel.cm-textfield': {
      color: fg1,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },

    // Panels
    '.cm-panels': {
      backgroundColor: tooltipBackground,
      color: fg1,
      borderRadius: '4px',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${bg3}`,
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${bg3}`,
    },
    '.cm-panel button': {
      backgroundColor: tooltipBackground,
      color: fg1,
      border: generalPanel.border,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover': {
      backgroundColor: bg2,
    },

    // Line highlighting
    '.cm-activeLine': {
      backgroundColor: highlightBackground,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },

    // Gutters
    '.cm-gutters': {
      backgroundColor: bg1,
      color: gray,
      border: generalGutter.border,
      borderRight: `1px solid ${bg2}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: darkBackground,
      color: fg1,
      fontWeight: generalGutter.fontWeight,
    },
    '.cm-lineNumbers': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter': {
      fontSize: generalGutter.fontSize,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: gray,
      cursor: 'pointer',
    },
    '.cm-foldGutter .cm-gutterElement:hover': {
      color: fg1,
    },

    // Tooltips and autocomplete
    '.cm-tooltip': {
      backgroundColor: tooltipBackground,
      border: `1px solid ${bg3}`,
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
        color: fg0,
        borderRadius: generalTooltip.borderRadiusSelected,
      },
      '& > ul > li > span.cm-completionIcon': {
        color: gray,
        paddingRight: generalTooltip.paddingRight,
      },
      '& > ul > li > span.cm-completionDetail': {
        color: gray,
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
      outline: `1px solid ${bg3}`,
      borderRadius: generalMatching.borderRadius,
    },

    // Fold placeholder
    '.cm-foldPlaceholder': {
      backgroundColor: tooltipBackground,
      color: gray,
      border: `1px dotted ${bg3}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },

    // Focus outline
    '&.cm-focused': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${bg0}, 0 0 0 3px ${orange}40`,
    },

    // Scrollbars
    '& .cm-scroller::-webkit-scrollbar': {
      width: generalScroller.width,
      height: generalScroller.height,
    },
    '& .cm-scroller::-webkit-scrollbar-track': {
      background: bg1,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: bg3,
      borderRadius: generalScroller.borderRadius,
      border: `3px solid ${bg1}`,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: bg4,
    },

    // Ghost text
    '.cm-ghostText': {
      opacity: '0.5',
      color: gray,
    },
  },
  { dark: true },
);

/**
 * Enhanced syntax highlighting for Gruvbox Dark theme
 */
export const gruvboxDarkHighlightStyle = HighlightStyle.define([
  // Keywords and control flow
  { tag: t.keyword, color: red, fontWeight: 'bold' },
  { tag: t.controlKeyword, color: red, fontWeight: 'bold' },
  { tag: t.moduleKeyword, color: red, fontWeight: 'bold' },

  // Names and variables
  { tag: [t.name, t.deleted, t.character, t.macroName], color: blue },
  { tag: [t.variableName], color: blue },
  { tag: [t.propertyName], color: aqua, fontStyle: 'normal' },

  // Classes and types
  { tag: [t.typeName], color: aqua },
  { tag: [t.className], color: yellow, fontStyle: 'italic' },
  { tag: [t.namespace], color: blue, fontStyle: 'italic' },

  // Operators and punctuation
  { tag: [t.operator, t.operatorKeyword], color: fg1 },
  { tag: [t.bracket], color: gray },
  { tag: [t.brace], color: gray },
  { tag: [t.punctuation], color: gray },

  // Functions and parameters
  { tag: [t.function(t.variableName), t.labelName], color: yellow },
  { tag: [t.definition(t.variableName)], color: blue },

  // Constants and literals
  { tag: t.number, color: purple },
  { tag: t.changed, color: purple },
  { tag: t.annotation, color: invalid, fontStyle: 'italic' },
  { tag: t.modifier, color: purple, fontStyle: 'italic' },
  { tag: t.self, color: purple },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: orange },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: orange },

  // Strings and regex
  { tag: [t.processingInstruction, t.inserted], color: green },
  { tag: [t.special(t.string), t.regexp], color: green },
  { tag: t.string, color: green },

  // Punctuation and structure
  { tag: t.definition(t.typeName), color: aqua, fontWeight: 'bold' },

  // Comments and documentation
  { tag: t.meta, color: gray },
  { tag: t.comment, fontStyle: 'italic', color: gray },
  { tag: t.docComment, fontStyle: 'italic', color: gray },

  // HTML/XML elements
  { tag: [t.tagName], color: red },
  { tag: [t.attributeName], color: yellow },

  // Markdown and text formatting
  { tag: [t.heading], fontWeight: 'bold', color: yellow },
  { tag: [t.strong], fontWeight: 'bold', color: yellow },
  { tag: [t.emphasis], fontStyle: 'italic', color: green },

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
    color: fg1,
    textDecoration: 'underline wavy',
    borderBottom: `1px wavy ${invalid}`,
  },
  { tag: [t.strikethrough], color: invalid, textDecoration: 'line-through' },

  // Enhanced syntax highlighting
  { tag: t.constant(t.name), color: orange },
  { tag: t.deleted, color: invalid },
  { tag: t.squareBracket, color: gray },
  { tag: t.angleBracket, color: gray },

  // Additional specific styles
  { tag: t.monospace, color: fg1 },
  { tag: [t.contentSeparator], color: blue },
  { tag: t.quote, color: gray },
]);

/**
 * Combined Gruvbox Dark theme extension
 */
export const gruvboxDark: Extension = [
  gruvboxDarkTheme,
  syntaxHighlighting(gruvboxDarkHighlightStyle),
];
