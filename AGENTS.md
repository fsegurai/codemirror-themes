# AGENTS.md - AI Agent Guide for codemirror-themes

## Project Overview

**codemirror-themes** is a **monorepo of 26 CodeMirror 6 theme packages**. The architecture separates individual themes into independent npm packages under `packages/`, with a unified build system and demo application. Each theme is independently publishable on npm under the `@fsegurai/codemirror-theme-*` namespace.

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
- Build system reads from import.meta.env using vite/client (which is defined in tsconfig.json)

## File Structure Reference

```
codemirror-themes/
├── .github/
│   ├── workflows/
│   │   └── documentation.yml    ← CI/CD for markdown validation, link checking, demo build
│   └── labeler.yml             ← Auto-labeling for PRs (e.g., theme-abcdef, demo, infra)
├── packages/                   ← 26 individual theme packages
│   ├── abcdef/
│   ├── abyss/
│   ├── ... (26 themes total)
│   └── bundle/                 ← Aggregates all themes for convenience imports
├── demo/
│   ├── index.html             ← Main demo page
│   ├── playground.html        ← Interactive theme switcher
│   ├── scripts/
│   │   ├── index.ts           ← Entry point, renders README dynamically
│   │   ├── playground.ts      ← Theme selection UI logic
│   │   ├── header.ts          ← Header/navigation rendering
│   │   └── const/             ← Theme registry and constants
│   └── styles/
│       ├── app-theme.css      ← Main app styling
│       ├── themes.css         ← Live theme CSS variables
│       ├── playground.css     ← Playground-specific styles
│       └── variables.css      ← CSS custom properties
├── vite.config.js             ← Vite dev server & build config
├── tsconfig.json              ← TypeScript configuration
├── eslint.config.js           ← ESLint rules (single quotes, 2-space indent)
├── package.json               ← Root workspace config with script shortcuts
├── bunfig.toml                ← Bun package manager config
├── AGENTS.md                  ← This file (guidance for AI agents)
├── CONTRIBUTING.md            ← Contributor guidelines
├── CHANGELOG.md               ← Version history
└── README.md                  ← User-facing documentation
```

## Key Files & Their Purposes

### Configuration Files
- **tsconfig.json**: ES2022 target, ESM-only, strict mode, bundler resolution
- **eslint.config.js**: Enforces single quotes, 2-space indent, `before` operator-linebreak
- **vite.config.js**: Dev server on port 8000, handles demo build and theme imports
- **package.json**: Workspace configuration with bun workspaces, custom scripts

### Theme Package Structure
Each `packages/[theme-name]/` contains:
- **src/index.ts**: Main theme definition (5-10 code blocks for different syntax elements)
- **src/utils.ts**: Shared styling utilities (borders, cursors, panels, diffs)
- **package.json**: Individual package metadata, peer dependencies on codemirror
- **dist/**: Built output (index.js, index.cjs, index.d.ts) - auto-generated by cm-buildhelper

### Demo Application
- **demo/scripts/const/**: Theme registry - auto-discovered from packages/
- **demo/scripts/playground.ts**: Loads themes dynamically, handles UI switching
- **demo/styles/themes.css**: CSS variables injected at runtime for live theme switching

## Workflows & Commands

### Development Workflow
```bash
# 1. Install dependencies
bun install

# 2. For quick iteration on a specific theme
bun run build:packages                    # Rebuild all packages via cm-buildhelper
bun run start                             # Start vite dev server (localhost:8000)
# Edit packages/[theme-name]/src/index.ts and changes auto-reflect in demo

# 3. For multiple theme changes
bun run build:packages && bun run start   # Full rebuild + dev server

# 4. Quality checks before commit
bun run lint                              # ESLint + TypeScript check
bun test                                  # Run all tests

# 5. Build for production
bun run build:demo                        # Vite build output to dist/
```

### Adding a New Theme (Step-by-Step)
```bash
# 1. Copy existing theme structure
cp -r packages/abcdef packages/my-new-theme

# 2. Update identifiers in new theme
# - Modify packages/my-new-theme/src/index.ts:
#   - Change color palette
#   - Update export names: export const myNewTheme = ...
#   - Keep structure: theme extension + highlight + mergeStyles
# - Update packages/my-new-theme/package.json:
#   - Change name to @fsegurai/codemirror-theme-my-new-theme
#   - Update version

# 3. Build and test
bun run build:packages
bun run start
# Navigate to localhost:8000/playground.html and verify new theme appears

# 4. Add to bundle
# Edit packages/bundle/src/index.ts:
# export { myNewTheme, myNewThemeHighlight, myNewThemeMergeStyles } from '@fsegurai/codemirror-theme-my-new-theme'

# 5. Update documentation
# - Add entry to README.md themes table (alphabetically sorted)
# - Bump version in root package.json and new theme package.json
```

### Testing & Quality
```bash
bun run lint                              # Check ESLint rules + TypeScript
bun test                                  # Run all tests (if any)
bun run build:packages                    # Verify cm-buildhelper succeeds
```

## Critical Concepts for AI Agents

### 1. Build System (cm-buildhelper)
- **NOT Vite or Rollup** for packages - use cm-buildhelper specifically
- Triggered by `bun run build:packages` (runs `prepare` script in each package.json)
- Output: `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts` in each theme package
- **After editing theme source, ALWAYS run `bun run build:packages` before testing**

### 2. Code Block Validation in CI/CD
The `.github/workflows/documentation.yml` validates markdown syntax:
- Counts all lines starting with `` ` `` `` ` `` `` ` `` (code block markers)
- Requires EVEN count (paired opening/closing markers)
- Fails if any markdown file has unclosed code blocks

### 3. Theme Export Pattern (STRICT)
Every theme MUST export exactly three items:
```typescript
// 1. EditorView extension (combines theme colors + cursor + selection + gutter)
export const themeName: Extension = EditorView.theme({ ... }, { dark: true })

// 2. Syntax highlighting rules
export const themeNameHighlight = syntaxHighlighting(HighlightStyle.define([...]))

// 3. Merge/diff view styles
export const themeNameMergeStyles: IMergeRevertStyles = { ... }
```
If any export is missing, bundle will fail and demo won't load the theme.

### 4. Merge View Styles (IMergeRevertStyles)
Requires these exact properties:
- `backgroundColor`: Color for change indicator background
- `borderColor`: Border for changed regions
- `buttonColor`: Color for revert button
- `buttonHoverColor`: Hover state color
These are used in diff/merge views - omitting breaks the feature.

### 5. Color Naming Convention (Base16 Scheme)
Always follow this pattern for consistency:
- `base00`: Background color
- `base01-07`: UI elements (line numbers, selection, panels, cursor)
- `base08-0F`: Syntax highlighting (keywords, strings, comments, etc.)
- Additional: `invalid`, `darkBackground`, `cursor`, `selection`

Reference: See `packages/abcdef/src/index.ts` lines 1-35

### 6. General* Utilities (Shared Across All Themes)
These are defined in each theme's `utils.ts`:
- `generalContent`: Font family, size, line-height
- `generalGutter`: Gutter styling
- `generalDiff`: Diff/merge visual rules
- `generalCursor`, `generalPanel`, `generalLine`, etc.

**CRITICAL**: Changing these affects ALL 26 themes. Only modify if intentional and coordinated.

### 7. Package Registry & Bundle
- `packages/bundle/src/index.ts` re-exports all themes
- Must be kept in sync when adding/removing themes
- **If new theme not in bundle, it won't be available in demo**
- Demo loads themes dynamically from bundle

### 8. ESLint Rules (Non-Negotiable)
```javascript
// ✓ CORRECT
const colors = { base00: '#0a0e14', base01: '#0f1017' };
const rule = { color: base00 } // single quotes, 2-space indent
operators positioned before line break

// ✗ WRONG
const colors = { base00: "#0a0e14" }; // double quotes
const rule={color:base00}             // spacing
```
Run `bun run lint` frequently to catch violations early.

## Common Tasks & Solutions

### Task: View a theme in the demo
```bash
bun run start
# Visit http://localhost:8000/playground.html
# Use theme selector dropdown to switch themes
```

### Task: Edit colors in an existing theme
```bash
# 1. Open packages/[theme-name]/src/index.ts
# 2. Modify color constants at top of file
# 3. Build and reload
bun run build:packages
# Demo hot-reloads automatically
```

### Task: Add syntax highlighting rule
```bash
# In packages/[theme-name]/src/index.ts:
# Find the HighlightStyle.define([...]) block
# Add new rule following the pattern:
# { tag: t.keyword, color: base0A },  // Example: keywords in orange
# Then rebuild:
bun run build:packages
```

### Task: Debug why new theme doesn't appear
1. Check `packages/bundle/src/index.ts` has the export
2. Run `bun run build:packages` and verify no errors
3. Verify theme name in `packages/[theme]/package.json` matches export
4. Check browser console for import errors
5. Verify 3 exports present: theme + highlight + mergeStyles

### Task: Update documentation
- Root README.md: Theme table (keep alphabetically sorted)
- CONTRIBUTING.md: Update guidelines if workflow changes
- CHANGELOG.md: Add version entry with changes
- Package README.md: Individual theme documentation
- AGENTS.md: This file - update if AI guidance changes

## Debugging Tips for AI Agents

### "Theme not appearing in demo"
- Check: bundle export exists
- Check: build succeeded (`bun run build:packages` has no errors)
- Check: all 3 exports present (theme, highlight, mergeStyles)
- Check: export names match usage in bundle
- Clear: browser cache or restart `bun run start`

### "Build fails with ESLint errors"
- Run `bun run lint` to see full list
- Fix: double quotes → single quotes
- Fix: indent to 2 spaces
- Fix: operator position (before line break)
- Common: forgot semicolon or used `any` type

### "Markdown validation fails in CI"
- Count `` ` `` `` ` `` `` ` `` markers in file
- Must be even number (pairs)
- Check opening (```bash) and closing (```) are balanced
- Use: `grep -c '^\`\`\`' filename.md` to count

### "Merge styles not showing in diff view"
- Verify `[themeName]MergeStyles` export exists
- Check all 4 properties present: backgroundColor, borderColor, buttonColor, buttonHoverColor
- Verify colors are valid hex/rgb values
- Check theme is correctly applied to EditorView

### "Colors not matching design"
- Base16 scheme means overlapping color usage
- Some colors used for multiple purposes (e.g., base01 for selection + gutter)
- May need to adjust multiple base0X values to match design
- Reference: existing similar theme for comparison

## Monorepo Workspaces

- Uses **Bun workspaces** (see package.json root `workspaces` field)
- Each `packages/[theme]` is a separate workspace member
- `bun install` installs dependencies for all workspaces
- `bun run [script]` runs across all workspaces
- Publishing: `bun publish` from individual theme packages

## What NOT to Do

1. ❌ Edit `/packages/bundle/` manually without updating individual themes
2. ❌ Use `export default` - always use named exports
3. ❌ Change export names - breaks user code depending on theme
4. ❌ Hardcode colors - always use color constants
5. ❌ Forget to run `bun run build:packages` after editing src/
6. ❌ Use double quotes (ESLint will fail)
7. ❌ Use TypeScript `any` type (strict mode blocks it)
8. ❌ Add theme without updating `packages/bundle/src/index.ts`
9. ❌ Modify general* utilities without coordinating across all themes
10. ❌ Commit without running `bun run lint`


