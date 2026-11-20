/**
 * `@fsegurai/codemirror-theme-core`: the single source of `defineTheme` that every theme package depends on, plus the
 * `cssVariableTheme` preset whose colors are CSS custom properties.
 */
import { describe, expect, test } from 'bun:test';
import fs from 'node:fs';
import path from 'node:path';
import { EditorView } from '@codemirror/view';
import { editorRules, editorState, packagesDir, resolvedHighlights, themeIds } from './support/themes';

const coreDir = path.join(packagesDir, 'core');
const core = (await import(path.join(coreDir, 'src', 'index.ts'))) as Record<string, unknown>;
const corePkg = JSON.parse(fs.readFileSync(path.join(coreDir, 'package.json'), 'utf8'));

type CssVariableTheme = (options?: Record<string, unknown>) => {
  extension: never;
  mergeStyles: Record<string, string>;
};
const cssVariableTheme = core['cssVariableTheme'] as CssVariableTheme;
const cssVariableNames = core['cssVariableNames'] as (options?: Record<string, unknown>) => string[];

describe('core package', () => {
  test('is published as @fsegurai/codemirror-theme-core', () => {
    expect(corePkg.name).toBe('@fsegurai/codemirror-theme-core');
  });

  test('exports the theme building API', () => {
    for (const name of ['defineTheme', 'cssVariableTheme', 'cssVariableNames', 'applyMergeRevertStyles']) {
      expect(typeof core[name]).toBe('function');
    }
  });

  test.each(themeIds())('%s depends on the core package instead of a local copy', (id) => {
    const pkg = JSON.parse(fs.readFileSync(path.join(packagesDir, id, 'package.json'), 'utf8'));
    expect(pkg.dependencies?.['@fsegurai/codemirror-theme-core']).toBe(corePkg.version);
    expect(fs.existsSync(path.join(packagesDir, id, 'src', 'theme-core.ts'))).toBe(false);
    const source = fs.readFileSync(path.join(packagesDir, id, 'src', 'index.ts'), 'utf8');
    expect(source).toContain("import { defineTheme } from '@fsegurai/codemirror-theme-core';");
  });

  test('the bundle re-exports the core API', async () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(packagesDir, 'bundle', 'package.json'), 'utf8'));
    expect(pkg.dependencies?.['@fsegurai/codemirror-theme-core']).toBe(corePkg.version);
    const bundle = (await import(path.join(packagesDir, 'bundle', 'src', 'index.ts'))) as Record<string, unknown>;
    expect(bundle['defineTheme']).toBe(core['defineTheme']);
    expect(bundle['cssVariableTheme']).toBe(core['cssVariableTheme']);
  });
});

describe('cssVariableTheme', () => {
  test('UI colors are --cm-* custom properties with literal fallbacks', () => {
    const rules = editorRules(cssVariableTheme().extension);
    expect(rules).toContain('background-color: var(--cm-background, #ffffff)');
    expect(rules).toContain('color: var(--cm-foreground, #1f2328)');
    expect(rules).toMatch(
      /\.cm-gutters \{[^}]*background-color: var\(--cm-gutter-background, var\(--cm-background, #ffffff\)\)/,
    );
  });

  test('syntax colors are --cm-syntax-* custom properties; fine roles fall back to their parent', () => {
    const highlights = resolvedHighlights(cssVariableTheme().extension);
    expect(highlights['keyword']).toBe('color: var(--cm-syntax-keyword, #cf222e)');
    expect(highlights['controlKeyword']).toBe(
      'color: var(--cm-syntax-control-keyword, var(--cm-syntax-keyword, #cf222e))',
    );
    expect(highlights['comment']).toContain('color: var(--cm-syntax-comment, var(--cm-muted, #59636e))');
    expect(highlights['comment']).toContain('font-style: italic');
  });

  test('is light by default and dark with { dark: true }', () => {
    expect(editorState(cssVariableTheme().extension).facet(EditorView.darkTheme)).toBe(false);
    const dark = cssVariableTheme({ dark: true });
    expect(editorState(dark.extension).facet(EditorView.darkTheme)).toBe(true);
    expect(editorRules(dark.extension)).toContain('background-color: var(--cm-background, #0d1117)');
  });

  test('honors a custom prefix', () => {
    const rules = editorRules(cssVariableTheme({ prefix: '--ark-cm' }).extension);
    expect(rules).toContain('var(--ark-cm-background, #ffffff)');
    expect(rules).not.toContain('var(--cm-');
  });

  test('honors an explicit mapping and fallbacks', () => {
    const theme = cssVariableTheme({
      variables: { background: '--ark-surface', 'syntax-keyword': '#ff0000' },
      fallbacks: { foreground: '#111111' },
    });
    const rules = editorRules(theme.extension);
    expect(rules).toContain('background-color: var(--ark-surface, #ffffff)');
    expect(rules).toContain('color: var(--cm-foreground, #111111)');
    expect(resolvedHighlights(theme.extension)['keyword']).toBe('color: #ff0000');
  });

  test('lint icons stay valid images: SVG data URLs use the literal fallback colors', () => {
    const rules = editorRules(cssVariableTheme().extension);
    const dataUrls = [...rules.matchAll(/url\('data:[^']*'\)/g)].map((m) => m[0]);
    expect(dataUrls.length).toBeGreaterThan(0);
    for (const url of dataUrls) expect(url).not.toContain('var(');
  });

  test('cssVariableNames lists every variable the theme reads, each with the prefix', () => {
    const names = cssVariableNames();
    expect(names).toContain('--cm-background');
    expect(names).toContain('--cm-syntax-keyword');
    expect(names).toContain('--cm-gutter-background');
    expect(new Set(names).size).toBe(names.length);
    const css = `${editorRules(cssVariableTheme().extension)}\n${Object.values(resolvedHighlights(cssVariableTheme().extension)).join('\n')}`;
    const read = new Set([...css.matchAll(/var\((--cm-[\w-]+)/g)].map((m) => m[1]));
    const mergeStyles = Object.values(cssVariableTheme().mergeStyles).join(' ');
    for (const name of read) expect(names).toContain(name);
    for (const name of names.filter((n) => !read.has(n))) expect(mergeStyles).toContain(`var(${name},`);
    expect(cssVariableNames({ prefix: '--x' })[0]?.startsWith('--x-')).toBe(true);
  });

  test('the core README documents every variable name', () => {
    const readme = fs.readFileSync(path.join(coreDir, 'README.md'), 'utf8');
    for (const name of cssVariableNames()) expect(readme).toContain(`\`${name}\``);
  });
});
