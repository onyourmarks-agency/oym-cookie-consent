/* eslint-disable import/no-extraneous-dependencies */
const TerserPlugin = require('terser-webpack-plugin');
const preprocess = require('svelte-preprocess');
const SvelteCheckPlugin = require('svelte-check-plugin');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = function (webpack, config) {
  const babelPresets = [
    [
      '@babel/preset-typescript',
      {
        targets: {
          browsers: [
            "last 1 version",
            "> 1%",
            "not dead",
          ],
        },
        debug: true,
      },
    ],
  ];

  webpack.module.rules.push(
    {
      test: /(\.(t|j)s?$)|(\.svelte$)/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: babelPresets,
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime',
            ]
          },
        },
      ],
    },
    {
      test: /\.svelte$/,
      exclude: /node_modules\/@babel/,
      use: [
        {
          loader: 'svelte-loader',
          options: {
            preprocess: preprocess(),
            emitCss: true,
          },
        },
      ],
    }, {
      test: /\.mjs$/,
      resolve: {
        fullySpecified: false // https://github.com/graphql/graphql-js/issues/2721#issuecomment-723008284
      },
    },
  );

  webpack.plugins.push(
    new NpmDtsPlugin({
      logLevel: 'debug',
      output: './lib/_types/index.d.ts',
    })
  );

  webpack.optimization.minimizer.push(
    new TerserPlugin({
      parallel: 4,
      test: /\.[tj]s($|\?)/i,
    })
  );

  if (config.debug) {
    webpack.plugins.push(
      new SvelteCheckPlugin({}),
    );
  }
};
