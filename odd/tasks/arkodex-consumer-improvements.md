# Feature: arkodex-consumer-improvements

Objective: make `@fsegurai/codemirror-theme-*` simpler and better to use from Arkodex (and similar docs sites). Status: backlog — not scheduled.
Source: Arkodex consumer audit, 2026-11-18 · Locator: `odd/tasks/arkodex-consumer-improvements.md` · Engram mirror: `odd/arkodex-consumer-improvements/tasks` (create when scheduled).

## Specs

Arkodex paths are relative to the Arkodex repository root.

### S1 (proposal) — Publish `@fsegurai/codemirror-theme-core`
- Friction: an identical 831-line `src/theme-core.ts` (`defineTheme`, `ThemeDefinition`, `UiPalette`, syntax roles) is copied into all 34 packages under `packages/` (33 themes + `bundle`; one md5 for every copy), and it is not exported: e.g. `packages/solarized-dark/src/index.ts` exports only the theme and `applyMergeRevertStyles`. Consumers cannot define a matching theme of their own.
- Proposal: a `packages/core` package published as `@fsegurai/codemirror-theme-core` exporting `defineTheme`, `ThemeDefinition` and the palette/role types; every theme depends on it instead of a copy.
- Arkodex simplification: a custom brand theme (e.g. from `--ark-*` tokens) becomes a `defineTheme({...})` call; smaller installs when several themes are used.
- Value/effort: high / medium.

### S2 (proposal) — `cssVariableTheme` preset
- Friction: every theme is a fixed palette, so following light / dark / high contrast means swapping extensions. Arkodex registers `github-light`/`github-dark` with `withThemes` (`src/app/features/playground/playground.routes.ts:37-39`) and maps its app theme to one of them by hand (`src/app/features/playground/playground-page/playground-page.ts:325-336`).
- Proposal: `cssVariableTheme({ prefix: '--cm' } | mapping)` built on S1, whose UI and syntax colors are `var(--…)` references with fallbacks, so one extension follows any CSS theme.
- Arkodex simplification: drop `withThemes` and the theme mapping; set `--cm-*` from `--ark-*` tokens in CSS.
- Value/effort: high / medium (depends on S1).

## Tasks
- [x] T1 — S1 — delegated (writer) — done, uncommitted — RED: `tests/core.test.ts` failed (no `packages/core`); GREEN: 1318 pass, 99 snapshots unchanged
- [x] T2 — S2 — delegated (writer, same unit as T1) — done, uncommitted — RED: `cssVariableTheme` tests failed (module missing); GREEN: all `cssVariableTheme` tests pass

## Log
- L1 (2026-11-18) — User request, verbatim: "for libraries improvements, add notes to their respective repos for later implementation". These specs come from the Arkodex consumer audit of the same date.
- L2 (2026-11-18) — Arkodex currently pins the published `@fsegurai/codemirror-theme-github-light` and `@fsegurai/codemirror-theme-github-dark` `^6.2.7` (installed 6.2.7). S1 corrected: 34 identical `theme-core.ts` copies (33 themes + `bundle`), not 33.
- L3 (2026-11-19) — T1/T2 implemented (uncommitted). `packages/core` = `@fsegurai/codemirror-theme-core@6.0.0` (single `src/theme-core.ts`, moved from `packages/.helper/utils/`; `utils.ts` generated copy; `css-variable-theme.ts`). Correction to L2: only the 33 themes had a `theme-core.ts` copy; `bundle` had none — it now depends on core and re-exports `defineTheme`, `cssVariableTheme`, `cssVariableNames` and the types. Themes list core in `dependencies` (exact `6.0.0`, same scheme as bundle pins). `cssVariableTheme` options: `prefix`, `dark`, `variables`, `fallbacks`, `name`; 200 variables (14 base, 92 UI, 94 syntax), listed in `packages/core/README.md`. SVG lint icons/underlines keep literal fallback colors (data URLs cannot read CSS variables). Also per user instruction: `marked` 18.2.0→18.2.1, `@biomejs/biome` 2.6.7→2.6.8 (+ schema migrate); `portless` 0.18.1 held back by `bunfig.toml` minimumReleaseAge. Checks: `bun test` 1318 pass / 0 fail, 99 snapshots byte-identical; `bun run test:types` exit 0; `bun run build:packages` exit 0, core built first, 34 theme/bundle dists import the core; `bun run build:demo` exit 0; Biome on touched paths: 0 errors. Open: publish core before themes; run `generate:playground-pins` after the release so the docs playground import map pins the core. Engram mirror pending (parent).
- L5 (2026-11-19) — Independent verifier: no blockers. S1 pass (no `theme-core.ts` copies left; core builds first; 33 themes × ESM/CJS × CSS/highlight = 132 output comparisons identical to `HEAD`; theme `.d.ts` exports identical; bundle exports only gain `cssVariableNames`, `cssVariableTheme`, `defineTheme` and types; packed core + github-dark install and import under ESM/CJS). S2 pass (`var(--cm-…, fallback)` everywhere, `prefix`, `dark`, 200 names match the README). Advisories: bump theme versions before release (`github-dark@6.3.0` already on npm) and publish core first; bumping core alone leaves themes pinned to `6.0.0`; 11 new `useLiteralKeys` infos in `tests/core.test.ts`; core tarball has no LICENSE unless `build:packages:metadata` runs (same as themes).
- L6 (2026-11-19) — User request, verbatim: "bump projects and libraries to the new versions, update changelog and readmes and create docs for this new version release - don't commit nor publish anything". Release 6.32.0 prepared (uncommitted, unpublished): root 6.31.0→6.32.0; via `versions.json` + `version:update`, themes 6.3.0→6.4.0 (27) and 6.1.0→6.2.0 (`catppuccin-mocha`, `cobalt2`, `high-contrast-dark`, `high-contrast-light`, `material-ocean`, `synthwave-84`), bundle 6.5.0→6.6.0, core stays 6.0.0 (none of these versions exist on npm; core is unpublished); every theme and the bundle pin core `6.0.0` and the bundle pins the new theme versions exactly; `bun.lock` refreshed. CHANGELOG `[6.32.0] - 2026-11-19` with compare links; root README gains a core row and an import-map note. `docs/6.32.0` copied from 6.31.0 with a What's New page, `api/core.md`, `api/css-variable-theme.md` (every variable), a `css-variables` playground sample and import-map pins for all 35 workspace packages including the core; `tests/playground.test.ts` now also fails when a dependency of a pinned package (the core) has no pin (RED observed before pinning). Publish order: core, then the 33 themes, then the bundle.
