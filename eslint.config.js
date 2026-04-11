// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import e18e from '@e18e/eslint-plugin';
import json from '@eslint/json';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  e18e.configs.recommended,
  {
    // eslint-plugin-react-hooks
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // eslint-plugin-react-refresh
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  },
  eslintConfigPrettier,
  {
    // eslint-plugin-unused-imports
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    // eslint-plugin-unused-imports
    files: ['**/*.ts', '**/*.tsx', '**/*.spec.ts'],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // e18e dependency check
    files: ['package.json'],
    language: 'json/json',
    plugins: {
      e18e,
      json,
    },
    extends: ['e18e/recommended'],
    rules: {
      // disable core rules that assume JS sourceCode APIs which crash on JSON
      'no-irregular-whitespace': 'off',
    },
  },
  {
    // needs to be in its own object to act as global ignore
    ignores: ['dist', 'playwright-report', '*.cjs'],
  }
);
