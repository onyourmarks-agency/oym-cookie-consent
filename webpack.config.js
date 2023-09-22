const path = require('path');

const babelPresets = [
  [
    '@babel/preset-env',
    {
      targets: {
        browsers: [
          'last 1 version',
          '> 1%',
          'not dead',
        ],
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
        test: /(\.(t|j)s?$)/,
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
    extensions: ['*', '.js', '.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'tdecc',
    libraryTarget: 'umd',
  },
};
