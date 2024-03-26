export default {
  bracketSameLine: true,
  cssDeclarationSorterOrder: 'smacss',
  htmlWhitespaceSensitivity: 'ignore',
  plugins: ['prettier-plugin-css-order', 'prettier-plugin-svelte'],
  printWidth: 100,
  singleQuote: true,
  semi: true,
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
};
