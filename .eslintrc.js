module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'svelte3'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
  },
  settings: {
    'svelte3/typescript': () => require('typescript'),
    'svelte3/ignore-styles': () => true,
    polyfills: ['fetch', 'Promise', 'Object.values'],
  },
};
