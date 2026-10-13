---
label: Installation
description: Install a single theme package or the bundle that re-exports all 29 themes.
order: 1
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

The bundle (version 6.4.4 in this release) depends on exact versions of every theme package, so all themes stay in sync.

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
