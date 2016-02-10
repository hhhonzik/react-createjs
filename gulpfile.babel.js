import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import path from 'path';
import webpack from 'gulp-webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackBuild from './webpack/build';
import runSequence from 'run-sequence';
import yargs from 'yargs';


const port = process.env.PORT || 8000;
const reloadPort = process.env.RELOAD_PORT || 35729;

const args = yargs
  .alias('p', 'production')
  .argv;

gulp.task('clean', function () {
  del(['build']);
});

gulp.task('env', () => {
  process.env.NODE_ENV = args.production ? 'production' : 'development';
});

gulp.task('build', function () {
  return gulp.src('examples/basic/app.js')
    .pipe(webpack(makeConfig(true)))
    .pipe(gulp.dest('build/'));
});

gulp.task('build-webpack', ['env'], webpackBuild);
gulp.task('build', ['build-webpack']);


gulp.task("server-hot", function(callback) {
    // Start a webpack-dev-server
    const compiler = webpackBuild(false); // return compiler

    new WebpackDevServer(compiler, {
      contentBase: __dirname + '/',
      hot: true,
      debug: true,
      quiet: false,
      noInfo: false,
      lazy: true,
      filename: "[name]-[chunkhash].js",
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      headers: { "X-Custom-Header": "yes" },
      stats: { colors: true }
    }).listen(8000, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8000/webpack-dev-server/index.html");

    });
});


gulp.task('start', done => {
  if (args.production) {
    runSequence('clean', 'build', done);
  } else {
    runSequence('clean', 'build', 'server-hot', done);
  }
});


gulp.task('watch', function () {
  gulp.watch(['./build/*.js'], ['reload-js']);
});

gulp.task('default', ['start']);
