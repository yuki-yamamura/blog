import path from 'node:path';

import eslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import js from '@eslint/js';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  eslintPluginUnicorn.configs.recommended,
  eslintComments.recommended,
  svelte.configs.recommended,
  prettier,
  svelte.configs.prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    rules: {
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/name-replacements': 'off',
      'unicorn/no-null': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    },
  },
  {
    rules: {
      '@eslint-community/eslint-comments/require-description': ['error', { ignore: [] }],
    },
  },
  {
    files: ['**/*.ts', '**/*.svelte'],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    plugins: {
      'import-x': importX,
      perfectionist,
      'unused-imports': unusedImports,
    },
    rules: {
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [
            { pattern: '$lib/**', group: 'internal', position: 'before' },
            { pattern: './**/*.css', group: 'type', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import-x/no-cycle': ['error', { ignoreExternal: true, maxDepth: Infinity }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-nested-ternary': 'error',
      'require-await': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'throw' },
        { blankLine: 'always', prev: 'directive', next: '*' },
      ],
      'perfectionist/sort-object-types': [
        'error',
        { type: 'natural', groups: ['required-property', 'optional-property'] },
      ],
      'perfectionist/sort-objects': ['error', { type: 'natural' }],
      'perfectionist/sort-union-types': [
        'error',
        { type: 'natural', groups: ['unknown', 'nullish'] },
      ],
      'perfectionist/sort-named-imports': ['error'],
      'perfectionist/sort-named-exports': ['error'],
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    rules: {
      'unicorn/no-top-level-assignment-in-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  { ignores: ['**/*.config.{js,mjs,ts,mts,cts}'] },
);
