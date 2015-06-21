/**
 * Created by Nicolas on 6/21/15.
 */
/*eslint-env node */
/*eslint quotes: [2, "single"], curly: 2, no-multi-spaces:0*/
'use strict';

var gulp      = require('gulp'),
    watchLess = require('gulp-watch-less'),
    less      = require('gulp-less'),
    path      = require('path'),
    plumber   = require('gulp-plumber');

var topDir = path.resolve(__dirname, '../../'),
    acpLess = path.resolve(topDir, 'style', 'acp.less');

gulp.task('default', function () {
    return gulp.src(acpLess)
        .pipe(plumber())
        .pipe(watchLess(acpLess, {verbose: true}))
        .pipe(less())
        .pipe(gulp.dest(path.resolve(topDir, 'public', 'css')));
});
