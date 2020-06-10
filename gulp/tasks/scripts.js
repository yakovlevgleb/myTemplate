const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const config = require('../config.json');

gulp.task('scripts', () =>
	gulp
	.src(config.dev.js.src)
	.pipe(
		rename({
			suffix: '.min'
		})
	)
	.pipe(gulp.dest(config.dev.js.dest))
	.pipe(browserSync.stream())
);

gulp.task('scripts:build', () =>
	gulp
	.src(config.dev.js.src)
	.pipe(
		rename({
			suffix: '.min'
		})
	)
	.pipe(
		babel({
			presets: ['@babel/env']
		})
	)
	.pipe(uglify())
	.pipe(gulp.dest(config.dist.js.dest))
);

gulp.task('scripts-lib', () =>
	gulp
	.src(config.dev.jsLibs.src)
	.pipe(concat('vendor.min.js'))
	.pipe(gulp.dest(config.dev.jsLibs.dest))
	.pipe(browserSync.stream())
);

gulp.task('scripts-lib:build', () =>
	gulp
	.src(config.dist.jsLibs.src)
	.pipe(concat('vendor.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(config.dist.jsLibs.dest))
);
