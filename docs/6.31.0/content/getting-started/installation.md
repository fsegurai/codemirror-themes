---
label: Installation
description: Install a single theme package or the bundle that re-exports all 33 themes.
order: 2
tags: [ "installation", "npm", "setup" ]
keywords: [ "bun", "pnpm", "peer dependencies", "esm", "cjs" ]
---

# Installation

## Pick a package

| You need | Install |
|----------|---------|
| One or two specific themes | `@fsegurai/codemirror-theme-<name>` per theme |
| A theme picker with many themes | `@fsegurai/codemirror-theme-bundle` |

Both options expose the same export names. The bundle simply re-exports every theme package.

## Install a single theme

```bash
npm install @fsegurai/codemirror-theme-nord codemirror
# or
bun add @fsegurai/codemirror-theme-nord codemirror
```

## Install the bundle

```bash
npm install @fsegurai/codemirror-theme-bundle codemirror
# or
bun add @fsegurai/codemirror-theme-bundle codemirror
```

The bundle depends on exact versions of every theme package, so all themes stay in sync.

## Themes added in 6.31.0

```bash
npm install @fsegurai/codemirror-theme-dracula
npm install @fsegurai/codemirror-theme-one-dark
npm install @fsegurai/codemirror-theme-catppuccin-latte
npm install @fsegurai/codemirror-theme-rose-pine-dawn
```

They export `dracula`, `oneDark`, `catppuccinLatte` and `rosePineDawn`. `oneDark` has the same name as the export of
`@codemirror/theme-one-dark`; alias it on import if you use both (see [One Dark](../themes/one-dark.md)).

The package name of every theme is listed in the [theme catalog](../themes/README.md).

## Module formats

Every package ships the same build layout produced by `@codemirror/buildhelper`:

| File | Format |
|------|--------|
| `dist/index.js` | ES module (`import`) |
| `dist/index.cjs` | CommonJS (`require`) |
| `dist/index.d.ts`, `dist/index.d.cts` | TypeScript declarations |

All packages declare `"sideEffects": false`, so bundlers can tree-shake unused themes, including when you import from
the bundle.

## Next step

Continue with the [Quick Start](quick-start.md).
