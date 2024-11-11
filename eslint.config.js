import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'semi-spacing': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
];
