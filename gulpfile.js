'use strict';

let gulp = require('gulp');

let scripts = [
	'./*.js',
	'./lib/*.js',
	'./test/**/*.js'
];

gulp.task('lint', lintTask);

function lintTask() {
  let eslint = require('gulp-eslint');

  return gulp
    .src(scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', beep);

  function beep() {
    let gutil = require('gulp-util');
    gutil.beep();
  }
}
