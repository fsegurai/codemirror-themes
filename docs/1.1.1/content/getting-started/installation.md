---
label: Installation
description: Install the theme packages you need; each of the 20 themes is its own npm package.
order: 1
tags: [ "installation", "npm", "setup" ]
keywords: [ "bun", "pnpm", "peer dependencies", "esm", "cjs" ]
---

# Installation

## Pick a package

Every theme is a separate package named `@fsegurai/codemirror-theme-<name>`. Install one package per theme you use.
This release has no bundle package; `@fsegurai/codemirror-theme-bundle` arrived in 1.2.0.

## Install a single theme

```bash
npm install @fsegurai/codemirror-theme-nord codemirror
# or
bun add @fsegurai/codemirror-theme-nord codemirror
```

## Module formats

Every package ships the same build layout produced by `@codemirror/buildhelper`:

| File | Format |
|------|--------|
| `dist/index.js` | ES module (`import`) |
| `dist/index.cjs` | CommonJS (`require`) |
| `dist/index.d.ts` | TypeScript declarations |

All packages declare `"sideEffects": false`, so bundlers can tree-shake unused exports.

## Package scope

The repository README of this release shows `import { basicLight } from 'codemirror-theme-basic-light'`. That name is
missing the scope: the published packages are named `@fsegurai/codemirror-theme-<name>`, as in the commands above.
The README was corrected in 1.3.2.

## Next step

Continue with the [Quick Start](quick-start.md).
