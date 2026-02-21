import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin
    },

    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error'
    }
  },
  {
    files: ['.storybook/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      'react/no-unescaped-entities': 'off'
    }
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'postcss.config.mjs',
    'eslint.config.mjs',
    'next-sitemap.config.js',
    '.storybook/**',
    'node_modules/**',
    'next-env.d.ts'
  ])
]);
