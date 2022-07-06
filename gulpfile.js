'use strict';

const gulp = require('gulp');
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const sass = gulpSass(nodeSass);
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const prefixerOptions = {
    overrideBrowserslist: ['last 2 versions']
};

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./Public/**/*.scss', { base: "./" })
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(prefixerOptions)) // Automatically add browser specific prefixes
        .pipe(cleanCSS()) // Minify css
        .pipe(gulp.dest('.'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./Public/**/*.scss', gulp.series('sass'));
});