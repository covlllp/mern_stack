'use strict';

var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var staticsPath = path.join(__dirname, '..', 'build', 'public');
var entryPath = path.join(__dirname, '..', 'browser', 'js', 'main.js')

var progressOutput = function(percentage, msg) {
  if (percentage === 0) {
    console.log(chalk.yellow('Webpack compiler starting'));
  } else if (percentage === 1) {
    console.log(chalk.green('Webpack compiler complete'));
  }
};

module.exports = {
  name: 'browser',
  entry: [
    entryPath,
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: staticsPath,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(progressOutput)
  ]
};
