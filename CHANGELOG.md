# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

No changes have been made yet.

---

## [6.29.1] - 2025-01-23

### 🔧 Changes

- Changed the project logo for a more accurate one.
- Improved utils script to support Linux and Windows paths.

### 🐞 Fixes

- Fixed Visual Studio Code Dark & Light themes README files. Thanks to [@blurfx](https://github.com/blurfx) for the
  contribution in [#102](https://github.com/fsegurai/codemirror-themes/pull/102)

### 🔐 Security

- **Added dependencies**.
	- Dependencies
		- `@codemirror/state` - `6.5.4` - needed for demo playground.
	- Dev Dependencies
		- `glob` - `13.0.0` - needed for packages utilities.
- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/language` from `6.11.3` to `6.12.1`
		- `@lezer/markdown` from `1.6.0` to `1.6.3`
	- Dev Dependencies
		- `@eslint/js` from `9.39.1` to `9.39.2`
		- `@types/node` from `24.10.1` to `25.0.10`
		- `eslint` from `9.39.1` to `9.39.2`
		- `globals` from `16.5.0` to `17.1.0`
		- `rollup` from `4.53.3` to `4.56.0`
		- `typescript-eslint` from `8.48.1` to `8.53.1`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.29.1

---

## [6.29.0] - 2025-12-02

### ⚠️ BREAKING CHANGES ⚠️

- **Theme Declaration**: Changed VS Code theme declaration to be more consistent with the rest of the themes.
	- Visual Studio Code Dark Theme from `vsCodeDark` to `vscodeDark`
	- Visual Studio Code Light Theme from `vsCodeLight` to `vscodeLight`

### 🚀 Features

- **New Theme**: Added a new `catppuccin-mocha` theme to the collection.
- **New Theme**: Added a new `high-contrast-dark` theme to the collection.
- **New Theme**: Added a new `high-contrast-light` theme to the collection.
- **New Theme**: Added a new `synthwave-84` theme to the collection.

### 🔧 Changes

- Refactored the local storage theme keyword to a more accurate one based on the project.
- Improved keywords declared in the `package.json` files.

### 🐞 Fixes

- For rollout configuration file, fixed `process` import reference to point to `node:process` directly.
- Fixed inconsistent line-height between editor content and line numbers across all themes. Line numbers now properly
  align with their corresponding code rows.
	- <img alt="Comparison 1" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/releases/6.29.0/fix/6.29.0-fix-lineheight-1.png">
	- <img alt="Comparison 2" src="https://raw.githubusercontent.com/fsegurai/codemirror-themes/main/demo/public/releases/6.29.0/fix/6.29.0-fix-lineheight-2.png">

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/lang-markdown` from `6.3.4` to `6.5.0`
		- `@codemirror/language` from `6.11.2` to `6.11.3`
		- `@codemirror/language-data` from `6.5.1` to `6.5.2`
		- `@codemirror/legacy-modes` from `6.5.1` to `6.5.2`
		- `@codemirror/merge` from `6.10.2` to `6.11.2`
		- `@lezer/markdown` from `1.4.3` to `1.6.0`
		- `@material/web` from `2.3.0` to `2.4.1`
		- `marked` from `16.1.2` to `17.0.1`
		- `marked-highlight` from `2.2.2` to `2.2.3`
	- Dev Dependencies
		- `@eslint/js` from `9.33.0` to `9.39.1`
		  -`@rollup/plugin-commonjs` from `28.0.6` to `29.0.0`
		- `@rollup/plugin-node-resolve` from `16.0.1` to `16.0.3`
		- `@rollup/plugin-replace` from `6.0.2` to `6.0.3`
		- `@rollup/plugin-typescript` from `12.1.4` to `12.3.0`
		- `@semantic-release/release-notes-generator` from `14.0.3` from `14.1.0`
		- `cpy-cli` from `5.0.0` to `6.0.0`
		- `dotenv` from `17.2.1` to `17.2.3`
		- `eslint` from `9.33.0` to `9.39.1`
		- `globals` from `16.3.0` to `16.5.0`
		- `rimraf` from `6.0.1` to `6.1.2`
		- `rollup` from `4.46.2` to `4.53.3`
		- `semantic-release` from `24.2.7` to `25.0.2`
		- `typescript` from `5.9.2` to `5.9.3`
		- `typescript-eslint` from `8.39.1` to `8.48.0`
- **Removed dependencies** — removed unused dependencies.
	- Dev Dependencies
		- Removed `prettier` dependency.
		- Removed `ts-node` dependency.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.29.0

---

## [6.25.0] - 2025-08-11

### 🚀 Features

- **New Theme**: Added a new `cobalt2` theme to the collection.
- **Utils Declaration**: Added new utils scripts for better propagation across themes.
- Improved overall project documentation, including `CHANGELOG.md` and `CONTRIBUTING.md`.

### 🔧 Changes

- Enhanced helper utilities for easier theme development and testing.
- Removed unused methods from the rollup configuration.
- Refactored demo playground for better usability and maintainability.
- Updated all package `README.md` files to include the new theme.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@lezer/markdown` from `1.4.2` to `1.4.3`
		- `marked` from `15.0.9` to `15.0.12`
	- Dev Dependencies
		- `@eslint/js` from `9.25.1` to `9.27.0`
		- `eslint` from `9.25.1` to `9.27.0`
		- `globals` from `16.0.0` to `16.2.0`
		- `rollup` from `4.40.0` to `4.41.1`
		- `semantic-release` from `24.2.3` to `24.2.5`
		- `typescript-eslint` from `8.31.0` to `8.33.0`

### 🐞 Fixes

- Improved demo playground and logic.
- Refined overall themes structure styles.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.25.0

---

## [6.24.0] - 2025-06-02

### 🚀 Features

- **Utils Declaration**: Added utils declaration across themes.
- **Editor Support**: Added theme support for diff editor and unified editor.

### 🔧 Changes

- Improved demo playground and logic.
- Enhanced package keywords reference.
- Refined overall themes, structure styles, and documentation for a better visualization and usability.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/language` from `6.10.8` to `6.11.0`
		- `@codemirror/legacy-modes` from `6.4.3` to `6.5.1`
		- `@material/web` from `2.2.0` to `2.3.0`
		- `marked` from `15.0.7` to `15.0.9`
		- `prismjs` from `1.29.0` to `1.30.0`
	- Dev Dependencies
		- `@eslint/js` from `9.21.0` to `9.25.1`
		- `@rollup/plugin-commonjs` from `28.0.2` to `28.0.3`
		- `@rollup/plugin-node-resolve` from `16.0.0` to `16.0.1`
		- `dotenv` from `16.4.7` to `16.5.0`
		- `eslint` from `9.21.0` to `9.25.1`
		- `rollup` from `4.34.9` to `4.40.0`
		- `typescript` from `5.7.3` to `5.8.3`
		- `typescript-eslint` from `8.25.0` to `8.31.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.24.0

---

## [6.1.4.0] - 2025-04-22

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@lezer/markdown` from `1.4.1` to `1.4.2`
	- Dev Dependencies

### 🐞 Fixes

- Minor fixes and improvements.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.4.0

---

## [6.1.3.8] - 2025-03-02

### 🔧 Changes

- Improved project README.

### ⚡ Performance

- Upgraded libraries to the latest versions.

### 🐞 Fixes

- Fixed release setup files.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.8

---

## [6.1.3.7] - 2025-02-16

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dev Dependencies
		- `prettier` from `3.5.0` to `3.5.1`
		- `rollup` from `4.34.6` to `4.34.7`
		- `semantic-release` from `24.2.2` to `24.2.3`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.7

---

## [6.1.3.6] - 2025-02-14

### 🐞 Fixes

- Fixed release setup files.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/legacy-modes` from `6.4.2` to `6.4.3`
		- `@lezer/markdown` from `1.4.0` to `1.4.1`
		- `marked` from `15.0.6` to `15.0.7`
	- Dev Dependencies
		- `@eslint/js` from `9.19.0` to `9.20.1`
		- `eslint` from `9.19.0` to `9.20.1
		- `prettier` from `3.4.2` to `3.5.0`
		- `rollup` from `4.34.1` to `4.34.6`
		- `semantic-release` from `24.2.1` to `24.2.2`
		- `typescript-eslint` from `8.23.1` to `8.24.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.6

---

## [6.1.3.5] - 2025-02-04

### 🐞 Fixes

- Fixed release setup files.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.5

---

## [6.1.3.4] - 2025-02-02

### 🔧 Changes

- Improved `bundle` theme packages versioning.

### 🐞 Fixes

- Fixed release setup files.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dev Dependencies
		- `rollup` from `4.34.0` to `4.34.1`
		- `typescript-eslint` from `8.22.0` to `8.23.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.4

---

## [6.1.3.3] - 2025-01-13

### 🔧 Changes

- Migrated workflows package manager to Bun.js.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.3

---

## [6.1.3.2] - 2024-11-26

### 🔧 Changes

- Improved header theme local storage reference.
- Improved index logic.

### ⚡ Performance

- Upgraded libraries to the latest versions.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.2

---

## [6.1.3.1] - 2024-11-22

### 🚀 Features

- Added code block clipboard and highlight.

### 🔧 Changes

- Improved README, pipelines, and styles.
- Enhanced project structure.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.1

---

## [6.1.3.0] - 2024-11-15

### 🔧 Changes

- Refactored demo project.

### 🐞 Fixes

- Fixed local links redirect due to host URL.
- Fixed header current URL validation.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.3.0

---

## [6.1.0.0] - 2024-11-12

### 🚀 Features

- **New Theme**: Added a new `palenight` theme to the collection.
- **New Theme**: Added a new `vscode-light` theme to the collection.
- **New Theme**: Added a new `vscode-dark` theme to the collection.

### 🔧 Changes

- Improved README files.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/legacy-modes` from `6.5.0` to `6.5.1`
		- `marked` from `15.0.8` to `15.0.9`
	- Dev Dependencies
		- `@eslint/js` from `9.25.0` to `9.25.1`
		- `eslint` from `9.25.0` to `9.25.1`
		- `typescript-eslint` from `8.30.1` to `8.31.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.1.0.0

---

## [6.0.3] - 2024-11-11

### 🚀 Features

- Added ESLint support.

### 🔧 Changes

- Improved pipelines workflows and README.
- Enhanced library release pipeline and dependencies.

### 🐞 Fixes

- Fixed demo pipeline issues.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/lang-markdown` from `6.3.0` to `6.3.1`
		- `@codemirror/legacy-modes` from `6.4.1` to `6.4.2`
		- `@lezer/markdown` from `1.3.1` to `1.3.2`
	- Dev Dependencies
		- `rollup` from `4.24.0` to `4.25.0`
		- `typescript-eslint` from `8.13.0` to `8.14.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v6.0.3

---

## [1.3.2] - 2024-10-23

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/lang-markdown` from `6.2.5` to `6.3.0`
		- `@codemirror/language` from `6.10.2` to `6.10.3`
		- `@codemirror/legacy-modes` from `6.4.0` to `6.4.1`
		- `@lezer/markdown` from `1.3.0` to `1.3.1`
	- Dev Dependencies
		- `@codemirror/buildhelper` from `1.0.1` to `1.0.2`
		- `@rollup/plugin-commonjs` from `26.0.1` to `28.0.1`
		- `@rollup/plugin-node-resolve` from `15.2.3` to `15.3.0`
		- `prettier` from `3.3.2` to `3.3.3`
		- `rimraf` from `5.0.7` to `6.0.1`
		- `rollup` from `4.18.0` to `4.24.0`
		- `rollup-plugin-dev` from `2.0.4` to `2.0.5`
		- `typescript` from `5.4.5` to `5.6.3`

### 🐞 Fixes

- Fixed README.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.3.2

---

## [1.3.1] - 2024-10-21

### 🚀 Features

- Added Dependabot actions file.

### 🐞 Fixes

- Fixed demo deployment pipeline.
- Fixed npm publish pipeline.

### 🔐 Security

- **Update dependencies** — address potential vulnerabilities and/or improvements in development dependencies.
	- Dependencies
		- `@codemirror/language` from `6.10.1` to `6.10.2`
	- Dev Dependencies
		- `@rollup/plugin-commonjs` from `25.0.7` to `26.0.1`
		- `prettier` from `3.2.5` to `3.3.2`
		- `rimraf` from `5.0.5` to `5.0.7`
		- `rollup` from `4.17.0` to `4.18.0`

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.3.1

---

## [1.2.2] - 2024-06-11

### 🔧 Changes

- Improved main package file.
- Updated demo pipeline setup.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.2.2

---

## [1.2.0] - 2024-05-21

### 🚀 Features

- **New Theme**: Added a new `bundle` theme to the collection.

### 🔧 Changes

- Improved selection styles.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.2.0

---

## [1.1.1] - 2024-04-30

### 🐞 Fixes

- Fixed packages README.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.1.1

---

## [1.1.0] - 2024-04-29

### 🚀 Features

- Added demo pipeline setup.
- Created reference to the demo website.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.1.0

---

## [1.0.0] - 2024-04-29

### 🚀 Features

- Added 20 new themes for CodeMirror version 6.
- **New Theme**: Added a new `abcdef` theme to the collection.
- **New Theme**: Added a new `abyss` theme to the collection.
- **New Theme**: Added a new `android-studio` theme to the collection.
- **New Theme**: Added a new `andromeda` theme to the collection.
- **New Theme**: Added a new `basic-dark` theme to the collection.
- **New Theme**: Added a new `basic-light` theme to the collection.
- **New Theme**: Added a new `forest` theme to the collection.
- **New Theme**: Added a new `github-dark` theme to the collection.
- **New Theme**: Added a new `github-light` theme to the collection.
- **New Theme**: Added a new `gruvbox-dark` theme to the collection.
- **New Theme**: Added a new `gruvbox-light` theme to the collection.
- **New Theme**: Added a new `material-dark` theme to the collection.
- **New Theme**: Added a new `material-light` theme to the collection.
- **New Theme**: Added a new `monokai` theme to the collection.
- **New Theme**: Added a new `nord` theme to the collection.
- **New Theme**: Added a new `solarized-dark` theme to the collection.
- **New Theme**: Added a new `solarized-light` theme to the collection.
- **New Theme**: Added a new `tokyo-night-day` theme to the collection.
- **New Theme**: Added a new `tokyo-night-storm` theme to the collection.
- **New Theme**: Added a new `volcano` theme to the collection.

**Full Changelog**: https://github.com/fsegurai/codemirror-themes/commits/v1.0.0

---

## ✅ Compatibility

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer is **not supported**

---

[unreleased]: https://github.com/fsegurai/codemirror-themes/compare/v6.29.1...HEAD

[6.29.1]: https://github.com/fsegurai/codemirror-themes/compare/v6.29.0...v6.29.1

[6.29.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.25.0...v6.29.0

[6.25.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.24.0...v6.25.0

[6.24.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.4.0...v6.24.0

[6.1.4.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.8...v6.1.4.0

[6.1.3.8]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.7...v6.1.3.8

[6.1.3.7]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.6...v6.1.3.7

[6.1.3.6]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.5...v6.1.3.6

[6.1.3.5]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.4...v6.1.3.5

[6.1.3.4]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.3...v6.1.3.4

[6.1.3.3]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.2...v6.1.3.3

[6.1.3.2]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.1...v6.1.3.2

[6.1.3.1]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.3.0...v6.1.3.1

[6.1.3.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.1.0.0...v6.1.3.0

[6.1.0.0]: https://github.com/fsegurai/codemirror-themes/compare/v6.0.3...v6.1.0.0

[6.0.3]: https://github.com/fsegurai/codemirror-themes/compare/v1.3.2...v6.0.3

[1.3.2]: https://github.com/fsegurai/codemirror-themes/compare/v1.3.1...v1.3.2

[1.3.1]: https://github.com/fsegurai/codemirror-themes/compare/v1.2.2...v1.3.1

[1.2.2]: https://github.com/fsegurai/codemirror-themes/compare/v1.2.0...v1.2.2

[1.2.0]: https://github.com/fsegurai/codemirror-themes/compare/v1.1.1...v1.2.0

[1.1.1]: https://github.com/fsegurai/codemirror-themes/compare/v1.1.0...v1.1.1

[1.1.0]: https://github.com/fsegurai/codemirror-themes/compare/v1.0.0...v1.1.0

[1.0.0]: https://github.com/fsegurai/codemirror-themes/releases/tag/v1.0.0
