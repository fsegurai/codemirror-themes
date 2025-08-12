# 🙌 Contributing to codemirror-themes

Thanks for your interest in improving the **codemirror-themes** project! Whether it's fixing bugs, improving documentation, or suggesting new features—your help is welcome 🙏

---

## 🚀 Getting Started

> **Requirements**
> Ensure you're using **Node.js v20.x** and **Bun v1.1.x** or higher.

### 1. Clone the Repository

```bash
git clone https://github.com/fsegurai/codemirror-themes.git
cd codemirror-themes
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Build the Library

```bash
bun run build:packages
```

### 4. Start Development Server

```bash
bun run start
```

This will start the demo in watch mode for development.

---

## 🧪 Running Tests

To run the full test suite:

```bash
bun test
```

### 🐞 Debug Mode

If you encounter issues, run tests in verbose mode for detailed output:

```bash
bun test --verbose
```

---

## 🧼 Linting

> Linting is enforced as part of the CI pipeline. Please ensure your code is clean before pushing:

```bash
bun run lint
```

You can also lint specific parts:
- Demo: `bun run lint:demo`
- Packages: `bun run lint:packages`

---

## 📦 Working with Themes

This project uses a monorepo structure with individual theme packages in the `packages/` directory. Each theme has its own:

- `package.json` - Package configuration
- `README.md` - Theme-specific documentation
- `src/index.ts` - Main theme export
- `src/utils.ts` - Theme utilities (if needed)

### Adding a New Theme

1. Create a new folder in `packages/` with your theme name
2. Copy the structure from an existing theme
3. Update the theme colors and styles in `src/index.ts`
4. Add appropriate metadata in `package.json`
5. Create a README.md with theme preview and usage
6. Update all packages `README.md` to include your new theme

---

## ✍️ Commit Message Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)**.

| Type        | Description                           |
|-------------|---------------------------------------|
| `feat:`     | New feature                           |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation only changes            |
| `refactor:` | Code refactoring (no behavior change) |
| `test:`     | Adding or fixing tests                |
| `chore:`    | Maintenance tasks, build config       |
| `del:`      | File or code removal                  |

Example:

```bash
git commit -m "feat: add new dracula theme to codemirror-themes"
```

---

## 🔀 Submitting a Pull Request

Please follow these steps to ensure a smooth review:

1. **Merge** the latest changes from `main` into your branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git merge main
   ```

2. Make sure all tests pass:
   ```bash
   bun test
   ```

3. Build and verify your changes:
   ```bash
   bun run build:packages
   bun run build:demo
   ```

4. If you've added functionality:
    - Include **unit tests**.
    - Update the **README.md** or relevant documentation.
    - Add theme previews if applicable.

5. Reference any related issues in your PR comment:
   > Example: _"Closes #12"_

6. Ensure your PR title follows the **conventional commit** format.

---

## 🐛 Reporting Bugs

When submitting a bug report, please include:

- A **clear description** of the issue.
- The **expected vs actual behavior**.
- A **minimal reproducible example** (CodeSandbox or StackBlitz is ideal).
- Details about:
    - Browser(s) and OS
    - Node and Bun versions
    - CodeMirror version
    - Which theme is affected

---

## 💬 Need Help?

Open a [discussion](https://github.com/fsegurai/codemirror-themes/discussions)
or [create an issue](https://github.com/fsegurai/codemirror-themes/issues) and we'll do our best to assist!

---

Thanks for contributing to codemirror-themes! ✨
