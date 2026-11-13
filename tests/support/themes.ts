import fs from 'node:fs';
import path from 'node:path';
import { highlightingFor } from '@codemirror/language';
import { EditorState, type Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { type Tag, tags } from '@lezer/highlight';

export const repoRoot = path.resolve(import.meta.dir, '../..');
export const packagesDir = path.join(repoRoot, 'packages');

export interface LoadedTheme {
  /** Package folder name, e.g. `github-light`. */
  id: string;
  /** Exported extension name, e.g. `githubLight`. */
  exportName: string;
  module: Record<string, unknown>;
  extension: Extension;
}

export const camelCase = (id: string) => id.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

/** Theme package folders (everything under `packages/` except the bundle and dot folders). */
export function themeIds(): string[] {
  return fs
    .readdirSync(packagesDir)
    .filter((name) => !name.startsWith('.') && name !== 'bundle')
    .filter((name) => fs.existsSync(path.join(packagesDir, name, 'src', 'index.ts')))
    .sort();
}

export async function loadTheme(id: string): Promise<LoadedTheme> {
  const module = (await import(path.join(packagesDir, id, 'src', 'index.ts'))) as Record<string, unknown>;
  // Every package exports `<name>` and `<name>MergeStyles`; names are not always camelCase of the folder (vsCodeDark).
  const mergeExport = Object.keys(module).find((key) => key.endsWith('MergeStyles'));
  const exportName = mergeExport?.slice(0, -'MergeStyles'.length) ?? camelCase(id);
  const extension = module[exportName] as Extension | undefined;
  if (!extension) throw new Error(`Package "${id}" does not export "${exportName}"`);
  return { id, exportName, module, extension };
}

export async function loadAllThemes(): Promise<LoadedTheme[]> {
  return Promise.all(themeIds().map(loadTheme));
}

const modifiers = ['definition', 'constant', 'function', 'standard', 'local', 'special'] as const;
type ModifierName = (typeof modifiers)[number];

/**
 * Every Lezer base tag, every single-modifier variant and the nested variants the themes use.
 * Keys are stable, readable names such as `definition(function(variableName))`.
 */
export function allTags(): Array<[string, Tag]> {
  const base = Object.entries(tags).filter((entry): entry is [string, Tag] => typeof entry[1] !== 'function');
  const result: Array<[string, Tag]> = [...base];
  for (const mod of modifiers) {
    const apply = tags[mod] as (tag: Tag) => Tag;
    for (const [name, tag] of base) result.push([`${mod}(${name})`, apply(tag)]);
  }
  const nested: Array<[ModifierName, ModifierName, string]> = [
    ['definition', 'function', 'variableName'],
    ['function', 'definition', 'variableName'],
    ['definition', 'function', 'propertyName'],
  ];
  for (const [outer, inner, name] of nested) {
    const tag = (tags[outer] as (t: Tag) => Tag)(
      (tags[inner] as (t: Tag) => Tag)(tags[name as keyof typeof tags] as Tag),
    );
    result.push([`${outer}(${inner}(${name}))`, tag]);
  }
  return result;
}

/** Parse `.cls {a: b; c: d}` rules of a style module into a class → declarations map. */
function parseClassRules(css: string): Map<string, Record<string, string>> {
  const rules = new Map<string, Record<string, string>>();
  for (const match of css.matchAll(/\.(ͼ[\w-]+)\s*\{([^}]*)\}/g)) {
    const decls: Record<string, string> = {};
    for (const part of match[2].split(';')) {
      const index = part.indexOf(':');
      if (index > 0) decls[part.slice(0, index).trim()] = part.slice(index + 1).trim();
    }
    rules.set(match[1], { ...(rules.get(match[1]) ?? {}), ...decls });
  }
  return rules;
}

export function editorState(extension: Extension): EditorState {
  return EditorState.create({ extensions: extension });
}

/** Resolved highlight declarations per tag, sorted, e.g. `color: #5e81ac; font-weight: bold`. Empty when unstyled. */
export function resolvedHighlights(extension: Extension): Record<string, string> {
  const state = editorState(extension);
  const rules = new Map<string, Record<string, string>>();
  for (const mod of state.facet(EditorView.styleModule)) {
    for (const [cls, decls] of parseClassRules(mod.getRules())) rules.set(cls, decls);
  }
  const result: Record<string, string> = {};
  for (const [name, tag] of allTags()) {
    const classes = highlightingFor(state, [tag]);
    const decls: Record<string, string> = {};
    for (const cls of classes?.split(' ') ?? []) Object.assign(decls, rules.get(cls) ?? {});
    result[name] = Object.keys(decls)
      .sort()
      .map((key) => `${key}: ${decls[key]}`)
      .join('; ');
  }
  return result;
}

/** Editor UI CSS of the theme (style modules other than the syntax highlighter), with generated class names normalized. */
export function editorCss(extension: Extension): string {
  const state = editorState(extension);
  // A HighlightStyle module only contains single-class rules (`.ͼx {…}`); the EditorView.theme module has scoped,
  // descendant selectors. Dead (never-resolving) highlight rules make class-based detection unreliable.
  const css = state
    .facet(EditorView.styleModule)
    .map((mod) => mod.getRules())
    .filter((rules) => {
      const selectors = [...rules.matchAll(/([^{}]+)\{[^}]*\}/g)].map((m) => m[1].trim());
      return !selectors.every((selector) => /^\.ͼ[\w-]+$/.test(selector));
    })
    .join('\n');
  const names = new Map<string, string>();
  return css.replace(/ͼ[\w-]+/g, (cls) => {
    if (!names.has(cls)) names.set(cls, `ͼ${names.size}`);
    return names.get(cls) as string;
  });
}

/**
 * Order-insensitive form of {@link editorCss}: one line per individual selector with its merged, sorted declarations.
 * Moving rules into a shared template or splitting selector lists keeps this identical when the styling is unchanged.
 */
export function editorRules(extension: Extension): string {
  const merged = new Map<string, Record<string, string>>();
  for (const match of editorCss(extension).matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const decls: Record<string, string> = {};
    for (const part of match[2].split(';')) {
      const index = part.indexOf(':');
      if (index > 0) decls[part.slice(0, index).trim()] = part.slice(index + 1).trim();
    }
    for (const selector of match[1].split(',').map((s) => s.trim().replace(/\s+/g, ' '))) {
      merged.set(selector, { ...(merged.get(selector) ?? {}), ...decls });
    }
  }
  return [...merged]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([selector, decls]) => {
      const body = Object.keys(decls)
        .sort()
        .map((key) => `${key}: ${decls[key]}`)
        .join('; ');
      return `${selector} { ${body} }`;
    })
    .join('\n');
}

/** Declarations of the first rule whose selector list contains `selector` (exact selector part match). */
export function ruleFor(css: string, selector: string): Record<string, string> | undefined {
  for (const match of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const selectors = match[1]
      .split(',')
      .map((s) => s.trim().replace(/^\.ͼ\d+(\s+)?/, (_, space) => (space ? '& ' : '&')));
    if (!selectors.some((s) => s === selector || s === `& ${selector}` || s === `&${selector}`)) continue;
    const decls: Record<string, string> = {};
    for (const part of match[2].split(';')) {
      const index = part.indexOf(':');
      if (index > 0) decls[part.slice(0, index).trim()] = part.slice(index + 1).trim();
    }
    return decls;
  }
  return undefined;
}
