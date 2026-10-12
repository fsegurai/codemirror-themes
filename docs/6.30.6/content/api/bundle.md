---
label: Bundle
description: What @fsegurai/codemirror-theme-bundle re-exports and how it relates to the individual theme packages.
order: 3
tags: [ "api", "bundle", "re-exports" ]
keywords: [ "codemirror-theme-bundle", "tree-shaking", "dependencies" ]
---

# Bundle

`@fsegurai/codemirror-theme-bundle` (6.4.4) has no code of its own. Its entry point re-exports from the 29 theme
packages, which it lists as exact-version dependencies.

## Exports

| Group | Count | Examples |
|-------|-------|----------|
| Theme extensions | 29 | `abcdef`, `nord`, `vsCodeDark` |
| Merge styles | 29 | `abcdefMergeStyles`, `nordMergeStyles` |
| `applyMergeRevertStyles` | 1 | Re-exported from `@fsegurai/codemirror-theme-abcdef` |
| **Total** | **59** | |

The bundle does **not** export a combined `bundle` value. Import the theme you want by name:

```ts
import { abcdef, nord } from '@fsegurai/codemirror-theme-bundle';
```

## Bundle or single package?

| Choose | When |
|--------|------|
| Single package | You ship one or two fixed themes and want the smallest dependency tree. |
| Bundle | You build a theme picker or want every theme available with one install. |

Both declare `"sideEffects": false`, so bundlers drop themes you never reference.

## Peer dependencies

`@codemirror/language ^6.0.0`, `@codemirror/state ^6.0.0`, `@codemirror/view ^6.0.0`, `@lezer/highlight ^1.0.0`.
