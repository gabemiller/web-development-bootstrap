/**
 * Created by Gabor Molnar
 * 2016.01.23.
 */


/**
 * Gulp Plugins
 *
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var prettify = require('gulp-prettify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rimraf = require('gulp-rimraf');
var connect = require('gulp-connect');
var imagemin = require('gulp-imagemin');
var webpack = require("webpack-stream");
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');

/**
 *  Gulp config
 */

var path = require('./gulp.config').path;
var fileName = require('./gulp.config').fileName;

/**
 * Gulp Task
 *
 * Compile app.scss to app.css
 */
gulp.task('scss', function() {
    gulp.src(path.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(['last 2 version', 'ie 10']))
        .pipe(cleanCss())
        .pipe(rename(fileName.scss))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.scss.dest))
        .pipe(connect.reload());
});

/**
 * Gulp Task
 *
 * Get all the dependency js and concat them in vendor.js
 */
gulp.task('vendor', function (callback) {
    gulp.src([
            // JQuery and plugins
            './bower_components/jquery/dist/jquery.js',

            // jQuery UI components
            // './bower_components/jquery.ui/ui/datepicker.js',
            // './bower_components/jquery.ui/ui/core.js',
            // './bower_components/jquery.ui/ui/widget.js',
            // './bower_components/jquery.ui/ui/mouse.js',
            // './bower_components/jquery.ui/ui/position.js',
            // './bower_components/jquery.ui/ui/menu.js',
            // './bower_components/jquery.ui/ui/autocomplete.js',
            // './bower_components/jquery.ui/ui/slider.js',

            // Bootstrap components
            // './bower_components/bootstrap-js-components/dist/alert.js',
            // './bower_components/bootstrap-js-components/dist/collapse.js',
            // './bower_components/bootstrap-js-components/dist/dropdown.js',
            // './bower_components/bootstrap-js-components/dist/transition.js',
            // './bower_components/bootstrap-js-components/dist/modal.js',
            // './bower_components/bootstrap-js-components/dist/tab.js',
            // './bower_components/bootstrap-js-components/dist/tooltip.js',
            // './bower_components/bootstrap-js-components/dist/popover.js',
            // './bower_components/bootstrap-js-components/dist/scrollspy.js',
            // './bower_components/bootstrap-js-components/dist/dropdown.js',
            // './bower_components/bootstrap-js-components/dist/affix.js',

        ])
        .pipe(concat({path: 'vendor.js'}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(fileName.vendor))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.vendor.dest));
});

/**
 * Gulp Task
 *
 * Generate dist/scripts/app.js from src/js/app.js
 */
gulp.task('webpack', function () {
    var config = require('./webpack.config.js');
    return gulp.src(path.webpack.src)
        .pipe(webpack(config))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename(fileName.webpack))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.webpack.dest));
});

/**
 * Gulp Tasks
 *
 * Remove images from dist/images
 * Optimize images in src/images and copy them to dist/images
 */
gulp.task('images-optimize', function () {
    return gulp.src(path.image.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.image.dest));
});

gulp.task('images-remove', function () {
    return gulp.src(path.image.rm, {read: false})
        .pipe(rimraf());
});

gulp.task('images', ['images-remove', 'images-optimize']);

/**
 * Gulp Task
 *
 * Compile pug to html
 */
gulp.task('pug', function () {
    gulp.src([path.pug.src])
        .pipe(pug({
            pretty: false
        }))
        .pipe(prettify({
            unformatted: ['pre', 'code'],
            indent_inner_html: true,
            indegulnt_size: 2,
            brace_style: 'expand'
        }))
        .pipe(gulp.dest(path.pug.dest))
        .pipe(connect.reload());
});


/**
 * Gulp Server
 *
 * Start a server for testing your app.
 */
gulp.task('webserver', function() {
    connect.server({
        root: path.webserver.root,
        livereload: true,
        port: 8001
    });
});

/**
 *  Gulp watch
 *
 *  Watch all gulp tasks.
 */
gulp.task('watch', function () {
    gulp.watch(path.watch.webpack, ['webpack']);
    gulp.watch(path.watch.pug, ['pug']);
    gulp.watch(path.watch.scss, ['scss']);
    gulp.watch(path.watch.images, ['images']);
});

/**
 * Gulp Init
 *
 * Initialize all tasks and watchers.
 */
gulp.task('init', ['pug', 'scss', 'vendor', 'webpack', 'images','watch', 'webserver']);