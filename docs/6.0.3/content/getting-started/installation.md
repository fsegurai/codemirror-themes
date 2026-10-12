---
label: Installation
description: Install a single theme package or the bundle that re-exports all 20 themes.
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

Both options expose the same extension names. The bundle simply re-exports the theme packages.

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

The bundle (version 6.0.5 in this release) lists every theme package as a dependency with a caret range
(`^6.0.5`), so npm can resolve newer 6.0.x releases of individual themes.

## Module formats

Every package ships the same build layout produced by `@codemirror/buildhelper`:

| File | Format |
|------|--------|
| `dist/index.js` | ES module (`import`) |
| `dist/index.cjs` | CommonJS (`require`) |
| `dist/index.d.ts` | TypeScript declarations |

All packages declare `"sideEffects": false`, so bundlers can tree-shake unused exports.

## Next step

Continue with the [Quick Start](quick-start.md).
