import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/newline-after-import': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            'type',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '*.css',
              group: 'unknown',
              patternOptions: { matchBase: true },
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '_',
          ignoreRestSiblings: false,
          varsIgnorePattern: '_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];

export default eslintConfig;
