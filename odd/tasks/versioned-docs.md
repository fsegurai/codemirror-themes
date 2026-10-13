# Feature: versioned-docs

## Objective

Add real, versioned documentation for `@fsegurai/codemirror-themes` 6.30.6 under `docs/6.30.6/`, generated into
`manifest.json` and `search-index.json` with `@fsegurai/manifest-generator`.

## Problem / why

The only documentation is the root README, 30 templated package READMEs and the demo. A versioned docs tree (mirroring
the manifest-generator repo convention) lets a docs site render navigation and search per release.

## Scope

- `docs/6.30.6/content/**` Markdown pages with supported frontmatter only.
- `docs/6.30.6/manifest.json`, `docs/6.30.6/search-index.json` (generated).
- Root `package.json`: dev dependency `@fsegurai/manifest-generator@^1.1.0` and `generate:manifest` script.
- `bun.lock` update.

Out of scope: theme sources, bundle, demo, README, CHANGELOG, AGENTS changes; other scripts.

## Constraints

- Document only symbols exported from `packages/*/src/index.ts` and `packages/bundle/src/index.ts`; source wins over
  READMEs.
- Frontmatter keys restricted to the 21 supported by manifest-generator; no term in both `tags` and `keywords`.
- No commits by the writer: the user commits manually. No branch/stash/reset operations.

## Route

Delegated direct (one bounded writer). Trigger: writer trigger (20+ non-trivial new files).

## Checklist

- [x] T1 Docs content: overview, getting-started, themes, guides, api, examples, help.
- [x] T2 Wiring + generation: dev dependency, `generate:manifest` script, generated JSON.
- [x] T3 Validation (`--validate --docs-root`) and in-scope `git status` check. Commit pending: user commits manually.
- [x] T4 Past-version snapshots (latest per minor): 6.29.2, 6.25.0, 6.24.0, 6.1.4.0, 6.0.3, 1.3.2, 1.2.2, 1.1.1, 1.0.0.

## Acceptance criteria

- Every page has `label`, `description`, `order`, `tags`; section `README.md` files also have `breadcrumbTitle`.
- `bunx manifest-generator --validate --docs-root ./docs/6.30.6/content` exits 0 with 0 invalid.
- `bun run generate:manifest` writes `docs/6.30.6/manifest.json` and `docs/6.30.6/search-index.json`.

## Checks

- Validate command exit code and summary.
- Generate command exit code and `jq length` of both outputs.
- `git status --porcelain` shows only the paths in scope.

## Test-first exception

Passive documentation; no runnable RED test applies. Structural checks (validator + generator) are used instead.

## Progress / evidence

- T1: 31 Markdown pages under `docs/6.30.6/content/` (home 1, getting-started 3, themes 10, guides 6, api 4,
  examples 4, help 3). Themes are grouped by family (8 family pages + standalone dark themes) because the 29 package
  READMEs are generated from one template; family pages carry per-theme colors read from source and the resolved
  `<theme>MergeStyles` values (verified identical between `src` and `dist`).
- T2: `@fsegurai/manifest-generator@1.1.0` installed as dev dependency; `generate:manifest` script added.
- T3 evidence:
  - `bunx manifest-generator --validate --docs-root ./docs/6.30.6/content`: exit 0, 31 valid, 0 invalid, 0 warnings.
  - `bun run generate:manifest`: exit 0; `manifest.json` has 7 top-level entries, `search-index.json` 31 entries.
  - `git status --porcelain`: only `bun.lock`, `package.json`, `docs/`, `odd/`.

## Source discrepancies found

- Root README imports `{ bundle }` from `@fsegurai/codemirror-theme-bundle`; no such export exists (bundle re-exports
  named themes only). Docs use named imports.
- Root README Cobalt2 row link text says `@fsegurai/codemirror-theme-cobalt` (package is `...-cobalt2`).
- AGENTS.md says 26 themes (there are 29) and claims each theme exports a `<theme>Highlight`; the source exports only
  `<theme>`, `<theme>MergeStyles`, `applyMergeRevertStyles`.
- `IMergeRevertStyles` is declared but not exported by name from any package.
- CHANGELOG 6.30.5 lists `@codemirror/state` 6.7.5, root `package.json` still pins `^6.7.4`.

### T4 past-version snapshots

Route: delegated direct (two sequential bounded writers; ~270 generated pages). Old source read only via
`git show`/`git ls-tree`; no mutating git. **No commits - user commits manually.** Scope chosen by user: latest
release per minor.

| Version | Source rev | Pages | Themes | Key differences from the next newer snapshot |
|---------|------------|-------|--------|----------------------------------------------|
| 6.29.2 | tag `v6.29.2` (9d367a9) | 32 | 28 | No Material Ocean; bundle uses caret deps |
| 6.25.0 | `cf645eb` (tag `v6.25.0` points at 6.25.1) | 31 | 24 | No Catppuccin Mocha, High Contrast pair, Synthwave '84; gutter line-height unset |
| 6.24.0 | `553a54c` (no tag) | 31 | 23 | No Cobalt2; no CONTRIBUTING.md |
| 6.1.4.0 | `82d9e59` (no tag) | 30 | 23 | Exports `<theme>`, `<theme>Theme`, `<theme>HighlightStyle`; no merge styles |
| 6.0.3 | tag `v6.0.3` | 29 | 20 | No Palenight / VS Code themes; no theme sets a font |
| 1.3.2 | tag `v1.3.2` | 29 | 20 | `example/` instead of `demo/`; no ESLint |
| 1.2.2 | tag `v1.2.2` | 29 | 20 | Bundle introduced (6.0.0) |
| 1.1.1 | tag `v1.1.1` | 28 | 20 | No bundle |
| 1.0.0 | tag `v1.0.0` | 28 | 20 | No hosted demo |

T4 evidence: every snapshot `--validate --docs-root ./docs/<v>/content` exits 0 with 0 invalid, 0 warnings;
`manifest-generator --route ./docs/<v>/content --output ./docs/<v>` exits 0; manifest length 7; search-index length
equals page count; 0 broken relative links. Notable source-vs-CHANGELOG gaps: undocumented 6.24.0 export removals,
the 6.29.0 `vscodeDark` rename never existed in source, 6.0.3 color changes not in CHANGELOG.

## Next step

User reviews and commits docs, wiring, lockfile and generated JSON; then decides on push/PR.
