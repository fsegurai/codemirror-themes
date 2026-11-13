// Shared theme core: every theme package describes a palette (`ThemeDefinition`) and this module turns it into the
// CodeMirror extension. Generated into each package by `bun run generate:helpers`; edit only the copy in
// `packages/.helper/utils/`.
import { HighlightStyle, syntaxHighlighting, type TagStyle } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { type Tag, tags as t } from '@lezer/highlight';

import {
  generalContent,
  generalDiff,
  generalGutter,
  generalLine,
  generalMatching,
  generalPanel,
  generalPlaceholder,
  generalScroller,
  generalSearchField,
  generalTooltip,
  type IMergeRevertStyles,
} from './utils';

/** Semantic colors and composite CSS values of the editor UI. Every theme defines every token. */
export interface UiPalette {
  /** Editor background. */
  background: string;
  /** Default text color. */
  foreground: string;
  /** Outer editor border (`border` value); `'none'` unless the theme frames the editor. */
  border: string;
  /** Caret and drop cursor color. */
  cursor: string;
  /** Caret width. */
  cursorWidth: string;
  /** Caret glow (`box-shadow` value); `'none'` for most themes. */
  cursorShadow: string;
  /** Block cursor (Vim mode). */
  fatCursor: { background: string; border: string };
  /** Selected text background. */
  selection: string;
  /** Selection background while the editor is not focused. */
  selectionInactive: string;
  /** Color of selected text; `null` keeps the syntax colors. */
  selectionForeground: string | null;
  /** Outline around selected ranges (`outline` value); `'none'` for most themes. */
  selectionOutline: string;
  /** Active line background. */
  activeLine: string;
  /** Active line edge markers (`border` values); `'none'` for most themes. */
  activeLineBorder: { left: string; right: string };
  /** Inline completion (ghost text) color and opacity. */
  ghostText: string;
  ghostTextOpacity: string;
  /** Control characters shown by `highlightSpecialChars`. */
  specialChar: string;
  /** Focus ring of the focused editor (`box-shadow` value). */
  focusRing: string;
  /** Stroke width of match, bracket and tooltip outlines and of the gutter edge (`'2px'` in high-contrast themes). */
  outlineWidth: string;
  searchMatch: {
    background: string;
    outline: string;
    foreground: string;
    /** `box-shadow` value; `'none'` for most themes. */
    shadow: string;
    selectedBackground: string;
    selectedForeground: string;
    /** Outline of the current match (`outline` value). */
    selectedOutline: string;
    /** `box-shadow` value; `'none'` for most themes. */
    selectedShadow: string;
  };
  /** Other occurrences of the selected text. */
  selectionMatch: { background: string; outline: string };
  matchingBracket: {
    background: string;
    outline: string;
    /** `box-shadow` value; `'none'` for most themes. */
    shadow: string;
  };
  nonMatchingBracket: { background: string; outline: string };
  panel: {
    background: string;
    foreground: string;
    /** Separator color between panels and the editor. */
    border: string;
    /** Separator width. */
    borderWidth: string;
    /** Frame around the panels (`border` value); `'none'` for most themes. */
    outline: string;
    /** `box-shadow` value; `'none'` for most themes. */
    shadow: string;
    buttonBackground: string;
    buttonForeground: string;
    /** Button `border` value. */
    buttonBorder: string;
    buttonHoverBackground: string;
    buttonHoverForeground: string;
    /** Button `border` value on hover. */
    buttonHoverBorder: string;
    /** Button `box-shadow` value on hover; `'none'` for most themes. */
    buttonHoverShadow: string;
    /** Text fields (search, replace, go to line). */
    inputBackground: string;
    /** Text field `border` value. */
    inputBorder: string;
  };
  gutter: {
    background: string;
    foreground: string;
    border: string;
    activeBackground: string;
    activeForeground: string;
    activeFontWeight: string;
    /** Active line number `border` value; `'none'` for most themes. */
    activeBorder: string;
    /** Fold marker color on hover. */
    foldHover: string;
  };
  foldPlaceholder: { background: string; foreground: string; border: string };
  tooltip: {
    background: string;
    foreground: string;
    border: string;
    /** Tooltip `box-shadow` value. */
    shadow: string;
    /** Background of the autocomplete list. */
    listBackground: string;
    /** Autocomplete list `border` value. */
    listBorder: string;
    /** Background of a hovered completion. */
    hoverBackground: string;
    selectedBackground: string;
    selectedForeground: string;
    /** Selected completion `border` value; `'none'` for most themes. */
    selectedBorder: string;
    /** Completion icon color. */
    icon: string;
    /** Completion detail color. */
    detail: string;
  };
  diff: {
    insertedBackground: string;
    insertedForeground: string;
    /** `border` value of inserted text. */
    insertedBorder: string;
    deletedBackground: string;
    deletedForeground: string;
    /** `border` value of deleted text. */
    deletedBorder: string;
  };
  diagnostic: {
    error: string;
    warning: string;
    info: string;
    hint: string;
    /** Backgrounds of diagnostics in the lint panel and tooltips; `'transparent'` for most themes. */
    errorBackground: string;
    warningBackground: string;
    infoBackground: string;
    /** Width of the severity bar of a diagnostic. */
    borderWidth: string;
    /** Width of the wavy underline of a lint point. */
    underlineWidth: string;
  };
  scrollbar: {
    track: string;
    /** Track `border` value; `'none'` for most themes. */
    trackBorder: string;
    thumb: string;
    /** Thumb `border` value. */
    thumbBorder: string;
    thumbHover: string;
    /** Thumb `box-shadow` value on hover; `'none'` for most themes. */
    thumbHoverShadow: string;
  };
  /** Merge view revert column, see `applyMergeRevertStyles`. */
  merge: IMergeRevertStyles;
}

/** Text style of one syntax role. */
export interface RoleStyle {
  color?: string;
  backgroundColor?: string;
  fontStyle?: string;
  fontWeight?: string;
  opacity?: number | string;
  textDecoration?: string;
  textUnderlineOffset?: string;
  textUnderlinePosition?: string;
  textShadow?: string;
  borderBottom?: string;
}

/** Roles every theme defines. */
export interface BaseSyntaxRoles {
  keyword: RoleStyle;
  operator: RoleStyle;
  punctuation: RoleStyle;
  name: RoleStyle;
  property: RoleStyle;
  function: RoleStyle;
  type: RoleStyle;
  string: RoleStyle;
  number: RoleStyle;
  constant: RoleStyle;
  comment: RoleStyle;
  meta: RoleStyle;
  tag: RoleStyle;
  attribute: RoleStyle;
  /** Plain document text, such as Markdown paragraphs. */
  content: RoleStyle;
  heading: RoleStyle;
  link: RoleStyle;
  url: RoleStyle;
  emphasis: RoleStyle;
  strong: RoleStyle;
  strikethrough: RoleStyle;
  invalid: RoleStyle;
  inserted: RoleStyle;
  deleted: RoleStyle;
  changed: RoleStyle;
}

/** Fine roles; when omitted they use the style of their parent role (see `ROLE_PARENTS`). */
export interface FineSyntaxRoles {
  controlKeyword: RoleStyle;
  moduleKeyword: RoleStyle;
  definitionKeyword: RoleStyle;
  operatorKeyword: RoleStyle;
  modifier: RoleStyle;
  arithmeticOperator: RoleStyle;
  logicOperator: RoleStyle;
  compareOperator: RoleStyle;
  bitwiseOperator: RoleStyle;
  updateOperator: RoleStyle;
  derefOperator: RoleStyle;
  definitionOperator: RoleStyle;
  typeOperator: RoleStyle;
  controlOperator: RoleStyle;
  separator: RoleStyle;
  bracket: RoleStyle;
  paren: RoleStyle;
  brace: RoleStyle;
  squareBracket: RoleStyle;
  angleBracket: RoleStyle;
  character: RoleStyle;
  macroName: RoleStyle;
  variable: RoleStyle;
  localVariable: RoleStyle;
  variableDefinition: RoleStyle;
  nameDefinition: RoleStyle;
  functionDefinition: RoleStyle;
  self: RoleStyle;
  label: RoleStyle;
  propertyDefinition: RoleStyle;
  method: RoleStyle;
  methodDefinition: RoleStyle;
  specialProperty: RoleStyle;
  typeDefinition: RoleStyle;
  className: RoleStyle;
  namespace: RoleStyle;
  standardTag: RoleStyle;
  annotation: RoleStyle;
  documentMeta: RoleStyle;
  processingInstruction: RoleStyle;
  attributeValue: RoleStyle;
  literal: RoleStyle;
  docString: RoleStyle;
  regexp: RoleStyle;
  specialString: RoleStyle;
  escape: RoleStyle;
  unit: RoleStyle;
  atom: RoleStyle;
  bool: RoleStyle;
  null: RoleStyle;
  constantName: RoleStyle;
  standardName: RoleStyle;
  color: RoleStyle;
  specialVariable: RoleStyle;
  docComment: RoleStyle;
  headingLevel: RoleStyle;
  heading1: RoleStyle;
  heading2: RoleStyle;
  heading3: RoleStyle;
  heading4: RoleStyle;
  heading5: RoleStyle;
  heading6: RoleStyle;
  list: RoleStyle;
  quote: RoleStyle;
  monospace: RoleStyle;
  contentSeparator: RoleStyle;
}

export type SyntaxRole = keyof BaseSyntaxRoles | keyof FineSyntaxRoles;
export type SyntaxRoles = BaseSyntaxRoles & Partial<FineSyntaxRoles>;

/** Parent of every fine role: an omitted fine role resolves to its parent. */
export const ROLE_PARENTS: Record<keyof FineSyntaxRoles, SyntaxRole> = {
  controlKeyword: 'keyword',
  moduleKeyword: 'keyword',
  definitionKeyword: 'keyword',
  operatorKeyword: 'operator',
  modifier: 'keyword',
  arithmeticOperator: 'operator',
  logicOperator: 'operator',
  compareOperator: 'operator',
  bitwiseOperator: 'operator',
  updateOperator: 'operator',
  derefOperator: 'operator',
  definitionOperator: 'operator',
  typeOperator: 'operator',
  controlOperator: 'operator',
  separator: 'punctuation',
  bracket: 'punctuation',
  paren: 'bracket',
  brace: 'bracket',
  squareBracket: 'bracket',
  angleBracket: 'bracket',
  character: 'name',
  macroName: 'name',
  variable: 'name',
  localVariable: 'variable',
  variableDefinition: 'variable',
  nameDefinition: 'variableDefinition',
  functionDefinition: 'function',
  self: 'variable',
  label: 'name',
  propertyDefinition: 'property',
  method: 'property',
  methodDefinition: 'method',
  specialProperty: 'property',
  typeDefinition: 'type',
  className: 'type',
  namespace: 'type',
  standardTag: 'tag',
  annotation: 'meta',
  documentMeta: 'meta',
  processingInstruction: 'meta',
  attributeValue: 'string',
  literal: 'string',
  docString: 'string',
  regexp: 'string',
  specialString: 'regexp',
  escape: 'string',
  unit: 'number',
  atom: 'constant',
  bool: 'atom',
  null: 'constant',
  constantName: 'constant',
  standardName: 'constant',
  color: 'standardName',
  specialVariable: 'constant',
  docComment: 'comment',
  headingLevel: 'heading',
  heading1: 'headingLevel',
  heading2: 'headingLevel',
  heading3: 'headingLevel',
  heading4: 'headingLevel',
  heading5: 'headingLevel',
  heading6: 'headingLevel',
  list: 'name',
  quote: 'string',
  monospace: 'string',
  contentSeparator: 'punctuation',
};

/**
 * Canonical tag → role table shared by every theme: every Lezer base tag and the modifier combinations that the
 * official grammars emit. Each tag appears once, so no rule is shadowed by a later one.
 */
export const SYNTAX_TAGS: ReadonlyArray<readonly [SyntaxRole, readonly Tag[]]> = [
  ['keyword', [t.keyword]],
  ['controlKeyword', [t.controlKeyword]],
  ['moduleKeyword', [t.moduleKeyword]],
  ['definitionKeyword', [t.definitionKeyword]],
  ['operatorKeyword', [t.operatorKeyword]],
  ['modifier', [t.modifier]],
  ['operator', [t.operator]],
  ['arithmeticOperator', [t.arithmeticOperator]],
  ['logicOperator', [t.logicOperator]],
  ['compareOperator', [t.compareOperator]],
  ['bitwiseOperator', [t.bitwiseOperator]],
  ['updateOperator', [t.updateOperator]],
  ['derefOperator', [t.derefOperator]],
  ['definitionOperator', [t.definitionOperator]],
  ['typeOperator', [t.typeOperator]],
  ['controlOperator', [t.controlOperator]],
  ['punctuation', [t.punctuation, t.function(t.punctuation)]],
  ['separator', [t.separator]],
  ['bracket', [t.bracket]],
  ['paren', [t.paren]],
  ['brace', [t.brace, t.special(t.brace)]],
  ['squareBracket', [t.squareBracket]],
  ['angleBracket', [t.angleBracket]],
  ['name', [t.name, t.special(t.name)]],
  ['character', [t.character]],
  ['macroName', [t.macroName]],
  ['variable', [t.variableName, t.standard(t.variableName)]],
  ['localVariable', [t.local(t.variableName)]],
  ['variableDefinition', [t.definition(t.variableName)]],
  ['nameDefinition', [t.definition(t.name)]],
  ['function', [t.function(t.variableName)]],
  ['functionDefinition', [t.definition(t.function(t.variableName))]],
  ['self', [t.self]],
  ['label', [t.labelName]],
  ['property', [t.propertyName]],
  ['propertyDefinition', [t.definition(t.propertyName)]],
  ['method', [t.function(t.propertyName)]],
  ['methodDefinition', [t.definition(t.function(t.propertyName))]],
  ['specialProperty', [t.special(t.propertyName), t.definition(t.special(t.propertyName))]],
  ['type', [t.typeName, t.standard(t.typeName)]],
  ['typeDefinition', [t.definition(t.typeName)]],
  ['className', [t.className, t.definition(t.className), t.constant(t.className)]],
  ['namespace', [t.namespace]],
  ['tag', [t.tagName]],
  ['standardTag', [t.standard(t.tagName)]],
  ['attribute', [t.attributeName, t.special(t.attributeName)]],
  ['attributeValue', [t.attributeValue]],
  ['literal', [t.literal]],
  ['string', [t.string]],
  ['docString', [t.docString]],
  ['regexp', [t.regexp]],
  ['specialString', [t.special(t.string), t.special(t.docString)]],
  ['escape', [t.escape]],
  ['number', [t.number, t.integer, t.float]],
  ['unit', [t.unit]],
  ['atom', [t.atom]],
  ['bool', [t.bool]],
  ['null', [t.null]],
  ['constantName', [t.constant(t.name)]],
  ['standardName', [t.standard(t.name)]],
  ['color', [t.color]],
  ['specialVariable', [t.special(t.variableName)]],
  ['comment', [t.comment, t.lineComment, t.blockComment]],
  ['docComment', [t.docComment]],
  ['meta', [t.meta]],
  ['documentMeta', [t.documentMeta]],
  ['processingInstruction', [t.processingInstruction]],
  ['annotation', [t.annotation]],
  ['content', [t.content, t.special(t.content)]],
  ['heading', [t.heading]],
  ['heading1', [t.heading1]],
  ['heading2', [t.heading2]],
  ['heading3', [t.heading3]],
  ['heading4', [t.heading4]],
  ['heading5', [t.heading5]],
  ['heading6', [t.heading6]],
  ['list', [t.list]],
  ['quote', [t.quote]],
  ['monospace', [t.monospace]],
  ['contentSeparator', [t.contentSeparator]],
  ['link', [t.link]],
  ['url', [t.url]],
  ['emphasis', [t.emphasis]],
  ['strong', [t.strong]],
  ['strikethrough', [t.strikethrough]],
  ['invalid', [t.invalid]],
  ['inserted', [t.inserted]],
  ['deleted', [t.deleted]],
  ['changed', [t.changed]],
];

/** CSS declarations of one UI selector; a `null` value is not emitted. */
export type UiDeclarations = Record<string, string | number | null>;

export interface ThemeDefinition {
  /** Human-readable theme name. */
  name: string;
  dark: boolean;
  ui: UiPalette;
  syntax: SyntaxRoles;
}

export interface DefinedTheme {
  /** Editor theme plus syntax highlighting, ready to add to an editor. */
  extension: Extension;
  /** Editor UI theme only. */
  theme: Extension;
  highlightStyle: HighlightStyle;
  mergeStyles: IMergeRevertStyles;
}

/** Inline SVG image (same encoding as `@codemirror/lint`), used to draw lint markers in the theme colors. */
function svg(content: string, attrs = 'viewBox="0 0 40 40"'): string {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}

/** Wavy underline of a lint range. */
function lintUnderline(color: string): string {
  return svg(
    `<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`,
    'width="6" height="3"',
  );
}

/**
 * Canonical UI template: the same selectors for every theme, only palette values differ. Rules of equal specificity
 * keep the order of the original theme files (later rules win).
 */
export function uiTemplate(ui: UiPalette): Record<string, UiDeclarations> {
  return {
    '&': {
      color: ui.foreground,
      backgroundColor: ui.background,
      border: ui.border,
      fontSize: generalContent.fontSize,
      fontFamily: generalContent.fontFamily,
    },
    '.cm-content': { caretColor: ui.cursor, lineHeight: generalContent.lineHeight },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: ui.cursor,
      borderLeftWidth: ui.cursorWidth,
      boxShadow: ui.cursorShadow,
    },
    '.cm-cursor-secondary': { borderLeftColor: ui.cursor, opacity: '0.6' },
    '.cm-fat-cursor': {
      backgroundColor: ui.fatCursor.background,
      color: ui.background,
      border: ui.fatCursor.border,
      boxShadow: ui.cursorShadow,
    },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: ui.selection, color: ui.selectionForeground, outline: ui.selectionOutline },
    '&:not(.cm-focused) .cm-selectionBackground': { backgroundColor: ui.selectionInactive },
    '.cm-selectionLayer': { zIndex: 100 },
    '.cm-searchMatch': {
      backgroundColor: ui.searchMatch.background,
      outline: `${ui.outlineWidth} solid ${ui.searchMatch.outline}`,
      color: ui.searchMatch.foreground,
      borderRadius: generalSearchField.borderRadius,
      boxShadow: ui.searchMatch.shadow,
    },
    '.cm-searchMatch span': { color: ui.searchMatch.foreground },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: ui.searchMatch.selectedBackground,
      color: ui.searchMatch.selectedForeground,
      padding: generalSearchField.padding,
      outline: ui.searchMatch.selectedOutline,
      boxShadow: ui.searchMatch.selectedShadow,
    },
    '.cm-searchMatch.cm-searchMatch-selected span': { color: ui.searchMatch.selectedForeground },
    '.cm-search.cm-panel.cm-textfield': {
      color: ui.panel.foreground,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },
    '.cm-textfield': {
      backgroundColor: ui.panel.inputBackground,
      color: ui.panel.foreground,
      border: ui.panel.inputBorder,
      borderRadius: generalSearchField.borderRadius,
      padding: generalSearchField.padding,
    },
    '.cm-panels': {
      backgroundColor: ui.panel.background,
      color: ui.panel.foreground,
      border: ui.panel.outline,
      borderRadius: generalPanel.borderRadius,
      boxShadow: ui.panel.shadow,
    },
    '.cm-panels.cm-panels-top': { borderBottom: `${ui.panel.borderWidth} solid ${ui.panel.border}` },
    '.cm-panels.cm-panels-bottom': { borderTop: `${ui.panel.borderWidth} solid ${ui.panel.border}` },
    '.cm-panel.cm-gotoLine': { color: ui.panel.foreground, padding: generalPanel.padding },
    '.cm-panel button, .cm-button': {
      backgroundColor: ui.panel.buttonBackground,
      backgroundImage: 'none',
      color: ui.panel.buttonForeground,
      border: ui.panel.buttonBorder,
      borderRadius: generalPanel.borderRadius,
      padding: generalPanel.padding,
    },
    '.cm-panel button:hover, .cm-button:hover': {
      backgroundColor: ui.panel.buttonHoverBackground,
      color: ui.panel.buttonHoverForeground,
      border: ui.panel.buttonHoverBorder,
      boxShadow: ui.panel.buttonHoverShadow,
    },
    '.cm-activeLine': {
      backgroundColor: ui.activeLine,
      borderLeft: ui.activeLineBorder.left,
      borderRight: ui.activeLineBorder.right,
      borderRadius: generalLine.borderRadius,
      zIndex: 1,
    },
    '.cm-gutters': {
      backgroundColor: ui.gutter.background,
      color: ui.gutter.foreground,
      border: generalGutter.border,
      borderRight: `${ui.outlineWidth} solid ${ui.gutter.border}`,
      paddingRight: generalGutter.paddingRight,
    },
    '.cm-activeLineGutter': {
      backgroundColor: ui.gutter.activeBackground,
      color: ui.gutter.activeForeground,
      fontWeight: ui.gutter.activeFontWeight,
      border: ui.gutter.activeBorder,
    },
    '.cm-lineNumbers': { fontSize: generalGutter.fontSize, lineHeight: generalGutter.lineHeight },
    '.cm-foldGutter': { fontSize: generalGutter.fontSize, lineHeight: generalGutter.lineHeight },
    '.cm-foldGutter .cm-gutterElement': { color: ui.gutter.foreground, cursor: 'pointer' },
    '.cm-foldGutter .cm-gutterElement:hover': { color: ui.gutter.foldHover },
    '.cm-gutter-lint': { color: ui.gutter.foreground },
    '.cm-lint-marker': { width: '1em', height: '1em' },
    '.cm-lint-marker-error': {
      content: svg(
        `<circle cx="20" cy="20" r="15" fill="${ui.diagnostic.error}" stroke="${ui.background}" stroke-width="4"/>`,
      ),
    },
    '.cm-lint-marker-warning': {
      content: svg(
        `<path fill="${ui.diagnostic.warning}" stroke="${ui.background}" stroke-width="4" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`,
      ),
    },
    '.cm-lint-marker-info': {
      content: svg(
        `<path fill="${ui.diagnostic.info}" stroke="${ui.background}" stroke-width="4" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`,
      ),
    },
    '.cm-changeGutter': { backgroundColor: ui.gutter.background },
    '.cm-merge-b .cm-changedLineGutter, .cm-inlineChangedLineGutter': { background: ui.diff.insertedForeground },
    '.cm-merge-a .cm-changedLineGutter, .cm-deletedLineGutter': { background: ui.diff.deletedForeground },
    '.cm-insertedLine': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: ui.diff.insertedBackground,
      color: ui.diff.insertedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
    },
    'ins.cm-insertedLine, ins.cm-insertedLine:not(:has(.cm-changedText))': {
      textDecoration: generalDiff.insertedTextDecoration,
      backgroundColor: `${ui.diff.insertedBackground} !important`,
      color: ui.diff.insertedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
      border: ui.diff.insertedBorder,
    },
    'ins.cm-insertedLine .cm-changedText': { background: 'transparent !important' },
    '.cm-deletedLine': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: ui.diff.deletedBackground,
      color: ui.diff.deletedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
    },
    'del.cm-deletedLine, del, del:not(:has(.cm-deletedText))': {
      textDecoration: generalDiff.deletedTextDecoration,
      backgroundColor: `${ui.diff.deletedBackground} !important`,
      color: ui.diff.deletedForeground,
      padding: generalDiff.insertedLinePadding,
      borderRadius: generalDiff.borderRadius,
      border: ui.diff.deletedBorder,
    },
    'del .cm-deletedText, del .cm-changedText': { background: 'transparent !important' },
    '.cm-merge-b .cm-changedLine, .cm-inlineChangedLine': { backgroundColor: ui.diff.insertedBackground },
    '.cm-merge-a .cm-changedLine, .cm-deletedChunk': { backgroundColor: ui.diff.deletedBackground },
    '.cm-collapsedLines': {
      background: ui.foldPlaceholder.background,
      color: ui.foldPlaceholder.foreground,
    },
    '.cm-mergeSpacer': { background: ui.merge.backgroundColor },
    '.cm-tooltip': {
      backgroundColor: ui.tooltip.background,
      color: ui.tooltip.foreground,
      border: `${ui.outlineWidth} solid ${ui.tooltip.border}`,
      borderRadius: generalTooltip.borderRadius,
      padding: generalTooltip.padding,
      boxShadow: ui.tooltip.shadow,
    },
    '.cm-tooltip-autocomplete > ul': { backgroundColor: ui.tooltip.listBackground, border: ui.tooltip.listBorder },
    '.cm-tooltip-autocomplete > ul > li': { padding: generalTooltip.padding, lineHeight: generalTooltip.lineHeight },
    '.cm-tooltip-autocomplete > ul > li:hover': { backgroundColor: ui.tooltip.hoverBackground },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
      backgroundColor: ui.tooltip.selectedBackground,
      color: ui.tooltip.selectedForeground,
      border: ui.tooltip.selectedBorder,
      borderRadius: generalTooltip.borderRadiusSelected,
    },
    '.cm-tooltip-autocomplete > ul > li > span.cm-completionIcon': {
      color: ui.tooltip.icon,
      paddingRight: generalTooltip.paddingRight,
    },
    '.cm-tooltip-autocomplete > ul > li > span.cm-completionDetail': { color: ui.tooltip.detail, fontStyle: 'italic' },
    '.cm-completionMatchedText': {
      color: 'inherit',
      fontWeight: 'bold',
      textDecoration: 'underline',
      textDecorationColor: ui.matchingBracket.outline,
    },
    '.cm-completionInfo': {
      backgroundColor: ui.tooltip.background,
      color: ui.tooltip.foreground,
      border: `${ui.outlineWidth} solid ${ui.tooltip.border}`,
      padding: generalTooltip.padding,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': { borderTopColor: 'transparent', borderBottomColor: 'transparent' },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: ui.tooltip.background,
      borderBottomColor: ui.tooltip.background,
    },
    '.cm-tooltip-lint': { color: ui.tooltip.foreground, padding: '0' },
    '.cm-tooltip-section:not(:first-child)': { borderTop: `1px solid ${ui.tooltip.border}` },
    '.cm-diagnostic-error': {
      borderLeft: `${ui.diagnostic.borderWidth} solid ${ui.diagnostic.error}`,
      backgroundColor: ui.diagnostic.errorBackground,
    },
    '.cm-diagnostic-warning': {
      borderLeft: `${ui.diagnostic.borderWidth} solid ${ui.diagnostic.warning}`,
      backgroundColor: ui.diagnostic.warningBackground,
    },
    '.cm-diagnostic-info': {
      borderLeft: `${ui.diagnostic.borderWidth} solid ${ui.diagnostic.info}`,
      backgroundColor: ui.diagnostic.infoBackground,
    },
    '.cm-diagnostic-hint': { borderLeft: `${ui.diagnostic.borderWidth} solid ${ui.diagnostic.hint}` },
    '.cm-diagnosticAction': {
      backgroundColor: ui.panel.buttonBackground,
      color: ui.panel.buttonForeground,
      border: ui.panel.buttonBorder,
      borderRadius: generalPanel.borderRadius,
    },
    '.cm-lintRange-error': { backgroundImage: lintUnderline(ui.diagnostic.error) },
    '.cm-lintRange-warning': { backgroundImage: lintUnderline(ui.diagnostic.warning) },
    '.cm-lintRange-info': { backgroundImage: lintUnderline(ui.diagnostic.info) },
    '.cm-lintRange-hint': { backgroundImage: lintUnderline(ui.diagnostic.hint) },
    '.cm-lintPoint-error': { borderBottom: `${ui.diagnostic.underlineWidth} wavy ${ui.diagnostic.error}` },
    '.cm-lintPoint-warning': { borderBottom: `${ui.diagnostic.underlineWidth} wavy ${ui.diagnostic.warning}` },
    '.cm-lintPoint-info': { borderBottom: `${ui.diagnostic.underlineWidth} wavy ${ui.diagnostic.info}` },
    '.cm-matchingBracket': {
      backgroundColor: ui.matchingBracket.background,
      outline: `${ui.outlineWidth} solid ${ui.matchingBracket.outline}`,
      borderRadius: generalMatching.borderRadius,
      boxShadow: ui.matchingBracket.shadow,
    },
    '.cm-nonmatchingBracket': {
      backgroundColor: ui.nonMatchingBracket.background,
      outline: `${ui.outlineWidth} solid ${ui.nonMatchingBracket.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-selectionMatch': {
      backgroundColor: ui.selectionMatch.background,
      outline: `${ui.outlineWidth} solid ${ui.selectionMatch.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-snippetField': {
      backgroundColor: ui.selectionMatch.background,
      outline: `1px dashed ${ui.selectionMatch.outline}`,
      borderRadius: generalMatching.borderRadius,
    },
    '.cm-snippetFieldPosition': { borderLeft: `1px dotted ${ui.cursor}` },
    '.cm-foldPlaceholder': {
      backgroundColor: ui.foldPlaceholder.background,
      color: ui.foldPlaceholder.foreground,
      border: `${ui.outlineWidth} dotted ${ui.foldPlaceholder.border}`,
      borderRadius: generalPlaceholder.borderRadius,
      padding: generalPlaceholder.padding,
      margin: generalPlaceholder.margin,
    },
    '&.cm-focused': { outline: 'none', boxShadow: ui.focusRing },
    '& .cm-scroller::-webkit-scrollbar': { width: generalScroller.width, height: generalScroller.height },
    '& .cm-scroller::-webkit-scrollbar-track': { background: ui.scrollbar.track, border: ui.scrollbar.trackBorder },
    '& .cm-scroller::-webkit-scrollbar-thumb': {
      backgroundColor: ui.scrollbar.thumb,
      borderRadius: generalScroller.borderRadius,
      border: ui.scrollbar.thumbBorder,
    },
    '& .cm-scroller::-webkit-scrollbar-thumb:hover': {
      backgroundColor: ui.scrollbar.thumbHover,
      boxShadow: ui.scrollbar.thumbHoverShadow,
    },
    '.cm-ghostText': { opacity: ui.ghostTextOpacity, color: ui.ghostText },
    '.cm-placeholder': { color: ui.ghostText },
    '.cm-specialChar': { color: ui.specialChar },
    '.cm-trailingSpace': { backgroundColor: ui.diff.deletedBackground },
    '.cm-highlightSpace': {
      backgroundImage: `radial-gradient(circle at 50% 55%, ${ui.gutter.foreground} 20%, transparent 0)`,
    },
    '.cm-crosshair': { cursor: 'crosshair' },
  };
}

/** Drops `null` declarations and selectors left without declarations. */
function emittedRules(spec: Record<string, UiDeclarations>): Record<string, Record<string, string | number>> {
  const result: Record<string, Record<string, string | number>> = {};
  for (const [selector, declarations] of Object.entries(spec)) {
    const emitted = Object.entries(declarations).filter(
      (entry): entry is [string, string | number] => entry[1] !== null,
    );
    if (emitted.length > 0) result[selector] = Object.fromEntries(emitted);
  }
  return result;
}

/** Style of a role, falling back through `ROLE_PARENTS` for omitted fine roles. */
export function resolveRole(syntax: SyntaxRoles, role: SyntaxRole): RoleStyle {
  let current: SyntaxRole | undefined = role;
  while (current) {
    const style: RoleStyle | undefined = syntax[current];
    if (style) return style;
    current = ROLE_PARENTS[current as keyof FineSyntaxRoles];
  }
  return {};
}

/** Highlight rules of a theme: one rule per entry of the canonical table. */
export function highlightRules(definition: ThemeDefinition): TagStyle[] {
  return SYNTAX_TAGS.map(([role, tagList]) => ({ tag: [...tagList], ...resolveRole(definition.syntax, role) }));
}

/** Builds the editor theme, the syntax highlighting and the merge view styles of a theme definition. */
export function defineTheme(definition: ThemeDefinition): DefinedTheme {
  const theme = EditorView.theme(emittedRules(uiTemplate(definition.ui)), { dark: definition.dark });
  const highlightStyle = HighlightStyle.define(highlightRules(definition));
  return {
    extension: [theme, syntaxHighlighting(highlightStyle)],
    theme,
    highlightStyle,
    mergeStyles: { ...definition.ui.merge },
  };
}
