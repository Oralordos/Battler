var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    webserver = require('gulp-webserver');

var CSS_SOURCE = ['src/css/**/*.sass', 'src/css/**/*.scss'],
    JS_SOURCE = ['src/js/**/*.js'],
    HTML_SOURCE = ['src/html/**/*.html'],
    DEST = 'builds/development/';

gulp.task('dev-js', function() {
    gulp.src(JS_SOURCE)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    gulp.src(JS_SOURCE)
        .pipe(concat('script.js'))
        .pipe(gulp.dest(DEST + 'js'));
});

gulp.task('dev-css', function() {
    gulp.src(CSS_SOURCE)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(DEST + 'css'));
});

gulp.task('dev-html', function() {
    gulp.src(HTML_SOURCE)
        .pipe(gulp.dest(DEST));
});

gulp.task('dev-webserver', function() {
    gulp.src(DEST)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('dev-watch', function() {
    gulp.watch(HTML_SOURCE, ['dev-html']);
    gulp.watch(CSS_SOURCE, ['dev-css']);
    gulp.watch(JS_SOURCE, ['dev-js']);
});

gulp.task('dev', ['dev-html', 'dev-css', 'dev-js']);

gulp.task('webserver', ['dev', 'dev-watch', 'dev-webserver']);

gulp.task('default', ['dev']);