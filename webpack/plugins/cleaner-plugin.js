/* eslint-disable import/no-extraneous-dependencies */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');

module.exports = function (webpack, config) {
  webpack.plugins.push(new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: config.components.cleaner.pattern,
    verbose: true,
  }));

  webpack.plugins.push(new ExtraneousFileCleanupPlugin({
    extensions: ['.js'],
    minBytes: 20,
  }));
};
