import ip from 'ip';
import webpack from 'webpack';

// cheap-module-eval-source-map, because we want original source, but we don't
// care about columns, which makes this devtool faster than eval-source-map.
// http://webpack.github.io/docs/configuration.html#devtool
const devtools = 'cheap-module-eval-source-map';

const HOT_RELOAD_PORT = 8000;
const serverIp = ip.address();
const BUILD_DIR = 'build/';


export default function makeConfig(isDevelopment) {
  console.log(isDevelopment);
  const hotLoader = isDevelopment ? [
    "webpack-dev-server/client?http://localhost:8000", "webpack/hot/dev-server"
  ] : [];

  const config = {
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      'basic': hotLoader.concat(['./examples/basic/app.js'])
    },

    output: isDevelopment ? {
      path: BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${HOT_RELOAD_PORT}/build/`
    } : {
      path: BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/assets/'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react'],
            env: {
              development: {
                presets: ['react-hmre']
              }
            }
          }
        }
      ]
    },

    plugins: (() => {
      const plugins = [];
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.NoErrorsPlugin()
        );
      }
      return plugins;
    })(),

    resolve: {
      root: __dirname + '/../',
      alias: {
        'react-createjs': 'lib/index.js'
      }
    }
  };
  return config;
}
