'use strict';

var gulp = require('gulp');
var scss = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var connect = require('gulp-connect-php');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('connect', function () {
  connect.server({
    base: "./public",
    hostname: "localhost",
    port: 5010
  });
});

gulp.task('browserSync', ['connect'], function () {
  browserSync({
    proxy: '127.0.0.1:5010',
    port: 5000,
    open: true
  });
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    // .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('twig', function () {
  gulp.src('templates/**/*.twig')
  .pipe(reload({
    stream: true
  }))
});

gulp.task('dev_strict', function () {
  gulp.src('app/**/*.php')
  .pipe(reload({
    
    stream: true
  }));
  gulp.watch('app/**/*.php', ['twig']);
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('templates/**/*.twig', ['twig']);
});

gulp.task('strict', [])
gulp.task('default', ['browserSync', 'connect', 'scss', 'watch']);
gulp.task('strict', ['dev_strict', 'default']);