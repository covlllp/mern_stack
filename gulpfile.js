'use strict';

var path = require('path');


var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');


gulp.task('buildCss', function() {
  return gulp.src('./browser/scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('buildJs', [], function() {
  return gulp.src('./browser/js/main.js')
    .pipe(plumber())
    .pipe(browserify())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('lintJs', function() {
  return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
    .pipe(jshint({
      strict: 'global',
      node: true
    })).pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', ['buildCss', 'buildJs'], function() {
  nodemon({
    ext: 'js, scss, html',
    ignore: ['node_modules', '.git', 'package.json', 'public'],
    tasks: function(changedFiles) {
      var tasks = [];
      changedFiles.forEach(function(file) {
        var pathArray = file.split('/');
        var browserChange = (pathArray[0] === 'browser');

        if (path.extname(file) === '.scss' && tasks.indexOf('buildCss') < 0) tasks.push('buildCss');
        if (path.extname(file) === '.js') {
          if (tasks.indexOf('lintJs') < 0) tasks.push('lintJs');
          if (browserChange && tasks.indexOf('buildJs') < 0) tasks.push('buildJs');
        }
      });
      return tasks;
    }
  });
});

gulp.task('default', ['lintJs'], function() {
  gulp.start('nodemon');
});
