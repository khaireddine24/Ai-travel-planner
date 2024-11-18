import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version:'detect'},
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      'react/jsx-no-target-blank':'warn',
      'react/prop-types':'off',
      'react/react-in-jsx-scope':'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'no-console': 'warn',
      'no-debugger': 'warn',

      'tailwindcss/classnames-order':'warn',
      'tailwindcss/no-custom-classname':'off',
      'tailwindcss/enforces-shorthand':'warn',
      'prefer-const': 'warn',
      'eqeqeq':['error','smart'],
      'arrow-body-style':['warn', 'as-needed'],
    },
  },

  {
    files: ['**/*.{js,jsx,html}'],
    plugins: {
      tailwindcss,
    },
    rules: {
      'tailwindcss/no-contradicting-classname':'error',
    },
  },
  prettier
];
