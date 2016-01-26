'use strict';

var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var staticsPath = path.join(__dirname, '..', 'build', 'public');
var jsPath = path.join(__dirname, '..', 'browser', 'js')
var entryPath = path.join(jsPath, 'main.js')

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
      },
      {
        test: /\.jsx?$/,
        include: jsPath,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
