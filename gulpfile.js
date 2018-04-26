'use strict';

const dirs = {
    source: 'static',  // папка с исходниками (путь от корня проекта)
    build: 'public' // папка с результатом работы (путь от корня проекта)
};

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const objectFitImages = require('postcss-object-fit-images');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-cleancss');

gulp.task('server', ['sass', 'js', 'jade-concat', 'img', 'fonts'], function() {

    browserSync.init({
        server: dirs.build,
        startPath: 'index.html',
        open: false,
        port: 8080
    });

    gulp.watch(dirs.source + "/img/*.*", ['img']);
    gulp.watch(dirs.source + "/scss/**/*.scss", ['sass']);
    gulp.watch(dirs.source + "/jade/**/*.jade", ['jade-concat']);
    gulp.watch(dirs.source + "/fonts/*.*", ['fonts']);
    gulp.watch(dirs.source + "/js/**/*.js", ['js']);
});

gulp.task('clean', function() {
    return del(dirs.build);
})

let postCssPlugins = [
    autoprefixer({
        browsers: ['last 2 version']
    }),
    mqpacker({
        sort: true
    }),
    objectFitImages()
];

gulp.task('sass', function() {
    return gulp.src(dirs.source + "/scss/styles.scss")
        .pipe(plumber({
            errorHandler: notify.onError(function(error) {
                return {
                    title: "Styles compilation error",
                    message: error.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(postCssPlugins))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirs.build + "/css/"))
        .pipe(browserSync.stream())
        .pipe(rename('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dirs.build + "/css/"));
});

gulp.task("jade-concat", function() {
    gulp.src(dirs.source + '/jade/*.jade')
        .pipe(plumber({
            errorHandler: notify.onError(function(error) {
                return {
                    title: "Jade compilation error",
                    message: error.message
                }
            })
        }))
        .pipe(jade({
            pretty: true,
            compileDebug: true
        }))
        .pipe(gulp.dest(dirs.build + '/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function() {
    return gulp.src(dirs.source + "/img/**/*.*")
        .pipe(gulp.dest(dirs.build + "/img/"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src(dirs.source + "/fonts/**/*.*")
        .pipe(gulp.dest(dirs.build + "/fonts/"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(dirs.source + "/js/**/*.*")
        .pipe(plumber({
            errorHandler: notify.onError(function(error) {
                return {
                    title: "JS compilation error",
                    message: error.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.build + "/js/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['server']);
