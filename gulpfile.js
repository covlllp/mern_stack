'use strict';

var path = require('path');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx');


gulp.task('lintJs', function() {
  return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
    .pipe(jshint({
      strict: 'global',
      node: true,
      linter: jsxhint.JSXHINT,
      browser: true
    })).pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('nodemon', [], function() {
  nodemon({
    ext: 'js',
    ignore: ['node_modules', '.git', 'public', 'browser'],
    tasks: function(changedFiles) {
      var tasks = [];
      changedFiles.forEach(function(file) {
        var pathArray = file.split('/');
        var browserChange = (pathArray[0] === 'browser');
        if (path.extname(file) === '.js' && tasks.indexOf('lintJs') < 0) tasks.push('lintJs');
      });
      return tasks;
    }
  });
});

gulp.task('default', ['lintJs'], function() {
  gulp.start('nodemon');
});
