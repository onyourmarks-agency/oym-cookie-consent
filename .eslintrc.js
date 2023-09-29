const aliases = require('./.aliases');
const aliasHelper = require('./esbuild/helpers/aliases');

module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['compat', '@typescript-eslint'],
  settings: {
    polyfills: ['fetch', 'Object.assign', 'Object.values', 'Promise'],
    'import/resolver': {
      alias: aliasHelper.formatEslintAliases(aliases),
    },
  },
  rules: {
    'compat/compat': 2,
    'import/prefer-default-export': 'off',
    'import/first': 'off',
    'import/no-mutable-exports': 'off',
    'linebreak-style': 0,
    'no-continue': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'max-len': [
      'error',
      {
        code: 150,
        tabWidth: 2,
        comments: 200,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-new': 0,
    'no-param-reassign': [2, { props: false }],
    'prefer-promise-reject-errors': 0,
  },
};
