module.exports = {
  cache: true,

  watch: true,

  entry: {
    'basic': ['./examples/basic/app.js']
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  resolve: {
    root: __dirname,
    alias: {
      'react-createjs': 'lib/index.js'
    }
  }
};
