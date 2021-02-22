const path = require('path');

const babelPresets = [
  [
    '@babel/preset-env',
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

module.exports = {
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
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
    ]
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'tdecc',
    libraryTarget: 'umd',
  },
};
