// TODO https://github.com/typescript-eslint/typescript-eslint/issues/7694 尚未支持flat config
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const reactPlugin = require('eslint-plugin-react')
const typescriptRecommended = require('@typescript-eslint/eslint-plugin/recommended')
const typescripParser = require('@typescript-eslint/parser')
const typescriptPlugin = require('@typescript-eslint/eslint-plugin')

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  'eslint:recommended',
  prettierRecommended,
  typescriptRecommended,
  {
    files: ['**/*.{ts|tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      parser: typescripParser,
    },
    plugins: {
      reactPlugin,
      typescriptPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {},
  },
]
