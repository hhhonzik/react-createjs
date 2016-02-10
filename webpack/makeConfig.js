
export default function makeConfig(isDevelopment) {
  const config = {
    cache: true,

    watch: true,

    entry: {
      'basic': ['./examples/basic/app.js']
    },

    output: {
      filename: 'build/[name].js'
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
      root: __dirname + '/../',
      alias: {
        'react-createjs': 'lib/index.js'
      }
    }
  };
  return config;
}
