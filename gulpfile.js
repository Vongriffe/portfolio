var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var jslint = require('gulp-jslint'); // nie dodany do skryptu (zaintalowany)
var plumber = require('gulp-plumber'); // nie dodany do skryptu (zaintalowany)



var Files = {
    html: './index.html',
    css_dest: './css',
    scss_all: './sass/**/*.scss',
    scss_main: './sass/*.scss'
}

gulp.task('sass', function(){

    return gulp.src(Files.scss_main)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', sass.logError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Files.css_dest))
        .pipe(browserSync.stream())
});

gulp.task('default', ['sass'], function(){

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(Files.scss_all, ['sass']);
    gulp.watch(Files.html, browserSync.reload);

});
