# AGENTS.md - AI Agent Guide for codemirror-themes

## Project Overview

**codemirror-themes** is a **monorepo of 25+ CodeMirror 6 theme packages**. The architecture separates individual themes into independent npm packages under `packages/`, with a unified build system and demo application.

### Architecture & Data Flow

```
Root (workspace config, shared tsconfig, build tools)
├── packages/[theme-name]/          ← Individual theme packages (26 total)
│   ├── src/index.ts               ← Theme definition (exports theme + mergeStyles)
│   ├── src/utils.ts               ← Shared styling helpers (colors, layouts)
│   └── package.json               ← Scoped package (@fsegurai/codemirror-theme-*)
├── packages/bundle/               ← Re-exports all themes for convenience
├── demo/                          ← Development & showcase application
│   ├── scripts/index.ts           ← README renderer & demo UI
│   ├── scripts/playground.ts      ← Interactive theme switcher
│   └── styles/themes.css          ← Live theme preview styling
└── build system (vite, typescript, eslint)
```

**Key Pattern**: Each theme is an **independent, publishable npm package** that exports:
- `export const [themeName]` - CodeMirror Extension
- `export const [themeName]MergeStyles` - Merge view styles (IMergeRevertStyles object)

## Critical Developer Workflows

### Build & Publish Pipeline
```bash
bun run build:packages     # Compiles all packages via cm-buildhelper (not vite)
bun run start              # Dev server with live reload (vite)
bun test                   # Runs tests across all packages
bun run lint               # ESLint + TypeScript checking
```

**Important**: Theme packages use **cm-buildhelper** (a CodeMirror-specific build tool), NOT rollup. This happens automatically via the `prepare` script in each package.json.

### Theme Development Workflow
When modifying a theme (e.g., `packages/gruvbox-dark/src/index.ts`):
1. Edit theme colors and highlight rules
2. Run `bun run build:packages` to trigger cm-buildhelper
3. Start demo with `bun run start` to see changes in real-time
4. The playground.ts automatically detects the built exports

### Adding a New Theme
1. Create `/packages/new-theme/src/index.ts` with CodeMirror Extension structure
2. Copy structure from existing theme (e.g., abcdef)
3. Follow the pattern: define color palette → create HighlightStyle → create EditorView extension
4. Add `utils.ts` with IMergeRevertStyles for merge view support
5. Create `package.json` (copy existing, update name/version)
6. Build with `bun run build:packages`
7. Add export to `packages/bundle/src/index.ts`

## Project-Specific Patterns & Conventions

### Theme Definition Pattern
Every theme exports exactly this structure:
```typescript
// Core extension
export const themeName: Extension = EditorView.theme({ ... }, { dark: true/false })

// Syntax highlighting
export const themeNameHighlight = syntaxHighlighting(HighlightStyle.define([...]))

// Merge/diff view support
export const themeNameMergeStyles: IMergeRevertStyles = {
  backgroundColor, borderColor, buttonColor, buttonHoverColor
}
```

### Color Palette Convention
Themes use a **base00-0F naming scheme** (inherited from Base16):
- `base00`: Background
- `base01-07`: UI elements (selection, gutters, panels)
- `base08-0F`: Syntax highlighting (keywords, comments, etc.)
- Additional: `invalid`, `darkBackground`, `cursor`, `selection`

See `packages/abcdef/src/index.ts` lines 1-35 as reference.

### Styling Utilities (utils.ts)
All themes share **standardized UI element styling** in utils.ts:
- `generalContent`: Font family (JetBrains Mono, Consolas), size, line-height
- `generalGutter`: Padding, font size, line height
- `generalDiff`: Diff/merge visual rules (strikethrough for deletions, etc.)
- `generalCursor`, `generalPanel`, `generalLine`, etc.

These are imported and used in index.ts to maintain consistency. **DO NOT change general* exports** without coordinating across all themes.

### ESLint Rules (Important!)
The project uses single quotes, 2-space indent, and enforces operator-linebreak='before':
```javascript
// ✓ Correct
const colors = {
  base00: '#0a0e14'
};

// ✗ Wrong
const colors = {
  base00: "#0a0e14"
};
```

See eslint.config.js for full rules. Run `bun run lint` before commits.

### TypeScript Configuration
- Target: ES2022
- Module: ES2022 (ESM only)
- Strict: true (no implicit any, etc.)
- Module resolution: Bundler (for monorepo)
- Exclude test files: `**/*.test-d.ts, **/*.spec.ts`

## Integration Points & Dependencies

### Key External Dependencies
- **@codemirror/view, @codemirror/state, @codemirror/language**: Core editor API
- **@lezer/highlight**: Syntax highlighting token definitions
- **@codemirror/merge**: Diff view (optional, used for mergeStyles exports)

### Cross-Component Communication
1. **Bundle Package**: Acts as aggregator. Always keep `packages/bundle/src/index.ts` in sync when adding themes.
2. **Demo Application**: Loads all themes dynamically. See `demo/scripts/themes.ts` for theme registry.
3. **Utils.ts Re-export**: Each theme imports from its own utils.ts (not shared). This allows theme-specific customization while maintaining consistency.

### Build Output Structure
```
packages/[theme]/dist/
├── index.js       ← ESM (used in dev/imports)
├── index.cjs      ← CommonJS (for compatibility)
├── index.d.ts     ← TypeScript declarations
```

## Common Pitfalls & Best Practices

### ✓ DO
- Use `export` not `export default` for themes
- Keep color definitions at the top of index.ts (easy to review/modify)
- Test with Markdown and TypeScript syntax in the playground
- Update CHANGELOG.md for all package version bumps
- Run `bun run lint` before pushing

### ✗ DON'T
- Modify general* utilities in utils.ts without consensus (affects 26 packages)
- Use TypeScript `any` type (strict mode enforced)
- Hardcode values - always reference color constants
- Change export names (breaks users importing specific themes)
- Forget to rebuild with cm-buildhelper (edit src/index.ts, then `bun run build:packages`)

## Development Server & Testing

- **Demo Server**: `bun run start` starts rollup dev server on localhost:8000
- **Live Reload**: Changes to demo/ files auto-reload; package changes require `bun run build:packages`
- **Theme Switching**: Use `demo/scripts/playground.ts` to test all themes in one interface
- **Security Scanning**: `make trivy-full` runs container-based vulnerability scan (outputs JSON/SARIF)

## Environment Configuration

- See `env.example` for configuration keys
- `HOST_URL`: Demo server hostname (injected by rollup replace plugin)
- `NODE_ENV`: Development/production mode (used by demo scripts)
- Build system reads from process.env via dotenv


