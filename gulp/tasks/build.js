const gulp = require('gulp');
const del = require('del');
const config = require('../config');

gulp.task('clean', () => del(config.dirs.dist));

gulp.task('build', (done) =>
  gulp.series(
    'clean',
    'pug:build',
    'sass:build',
	 'scripts:build',
	 'scripts-lib:build',
    'img:build',
    'fonts:build'
  )(done)
);
