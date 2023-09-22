const path = require('path');
const aliases = require('../.aliases');
const aliasHelper = require('./helpers/aliases');

const babelPresets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: ['last 1 version', '> 1%', 'not dead'],
      },
      debug: true,
    },
  ],
];

module.exports = {
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /(\.(t|j)s?$)|(\.svelte$)/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: babelPresets,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      ...{
        svelte: path.dirname(require.resolve('svelte/package.json')),
      },
      ...aliasHelper.formatWebpackAliases(aliases),
    },
    conditionNames: ['svelte', 'node', 'require'],
    extensions: ['.js', '.ts', '.svelte', '.mjs'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    library: 'tdecc',
    libraryTarget: 'umd',
  },
};
