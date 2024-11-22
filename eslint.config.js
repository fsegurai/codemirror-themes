import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/demo/dist', '**/*.min.js', '**/packages/*/dist'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: {
            var: 2,
          },
          outerIIFEBody: 0,
        },
      ],
      'operator-linebreak': [
        'error',
        'before',
        {
          overrides: {
            '=': 'after',
          },
        },
      ],
      'space-before-function-paren': ['error', 'never'],
      'no-cond-assign': 'off',
      'no-useless-escape': 'off',
      'one-var': 'off',
      'no-control-regex': 'off',
      'no-prototype-builtins': 'off',
      'no-extra-semi': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
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
