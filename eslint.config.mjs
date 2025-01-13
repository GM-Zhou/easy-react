import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort'; 
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      // 类型使用 import type 引入
      '@typescript-eslint/consistent-type-imports': 'error',
      // 允许 any
      '@typescript-eslint/no-explicit-any': 'off',
      // 优先使用 interface
      '@typescript-eslint/consistent-type-definitions': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
];
