var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
import webpackBuild from './webpack/build';
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

gulp.task('serve', function () {
  connect.server({
    port: port,
    livereload: {
      port: reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src('./build/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./build/*.js'], ['reload-js']);
});

gulp.task('default', ['clean', 'build', 'serve', 'watch']);
