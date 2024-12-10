import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import { fixupPluginRules } from '@eslint/compat';

// plugin
import tsEsLintParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import esLintReactPlugin from 'eslint-plugin-react';
import esLintReactHooksPlugin from 'eslint-plugin-react-hooks';
import esLintNextPlugin from '@next/eslint-plugin-next';

const ignores = [
  '**/node_modules/',
  '**/.next',
  '**/dist',
  '**/esm',
  '**/lib',
  './scripts/**/*',
  '**/jest.config.ts',
  '.storybook/**/*',
  '**/*.mjs',
  '**/*.js',
];

export default [
  // 無視するファイルを指定（従来の .eslintignore に相当）
  {
    ignores,
  },
  // eslint:recommendedに相当
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  // eslint-config-prettierはrulesを持つオブジェクトなので、ここに並べられる
  eslintConfigPrettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: tsEsLintParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      import: eslintPluginImport,
      'unused-imports': eslintPluginUnusedImports,
      'typescript-sort-keys': eslintPluginTypescriptSortKeys,
      'jsx-a11y': eslintPluginJsxA11y,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        },
        typescript: {},
      },
    },
    rules: {
      ...eslintPluginTypescriptSortKeys.configs.recommended.rules,
      'unused-imports/no-unused-imports': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },

          pathGroups: [
            {
              pattern: './**.module.scss',
              group: 'index',
              position: 'before',
            },
          ],
        },
      ],
      'import/prefer-default-export': 'off',
      'no-extra-semi': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      // v6 で strict に移動したルールを有効化
      '@typescript-eslint/no-non-null-assertion': 'warn',
      // v6 で recommended に追加されたルールを無効化
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      // stylistic を有効にしたため v5 の recommended にないルールを無効化
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
  // React用の設定
  {
    plugins: {
      react: esLintReactPlugin,
    },
    rules: {
      ...esLintReactPlugin.configs['jsx-runtime'].rules,
      'react/prefer-destructuring-assignment': 0, // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(esLintReactHooksPlugin),
    },
    rules: {
      ...esLintReactHooksPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: {
      '@next/next': fixupPluginRules(esLintNextPlugin),
    },
    rules: {
      ...esLintNextPlugin.configs.recommended.rules,
      ...esLintNextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off',
    },
  },
];
