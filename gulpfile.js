const gulp = require('gulp');
const less = require('gulp-less');
const prefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const jsmin = require('gulp-jsmin');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');

const path = {
    build: {
        js: 'static/js',
        css: 'static/css',
    },
    src: {
        js: 'src/js/*.js',
        jshint: 'src/js/*.js',
        less: 'src/less/*.less',
    },
    watch: {
        html: 'src/views/**/*.hbs',
        js: 'src/js/*.js',
        less: 'src/**/*.less',
    },
};

let dev = false;

gulp.task('js:build', () => {
    gulp.src(path.src.js)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulpIf(!dev, jsmin()))
        .pipe(gulp.dest(path.build.js))
});

gulp.task('css:build', () => {
    gulp.src(path.src.less)
        .pipe(less())
        .pipe(prefixer())
        .pipe(gulpIf(!dev, cssmin()))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('develop', () => {
    dev = true;

    gulp.watch(path.watch.less, ['css:build']);
    gulp.watch(path.watch.js, ['js:build']);
});

gulp.task('production', ['css:build', 'js:build']);
