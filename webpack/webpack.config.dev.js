var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    basic: [
      'webpack-hot-middleware/client',
      './examples/basic/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/build-examples/'
  },
  resolve: {
    alias: {
      'react-createjs': __dirname + '/../lib'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js/,
      loaders: ['babel'],
      exclude: [/node_modules/]
    }]
  }
};
