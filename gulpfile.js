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
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Imagemin = require('imagemin');
var rimraf = require('gulp-rimraf');
var connect = require('gulp-connect');

/**
 * Gulp Task
 *
 * Compile app.scss to app.css
 */
gulp.task('scss', function() {
    gulp.src('./src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'ie 9'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

/**
 * Gulp Task
 *
 * Get all the dependency js and concat them in vendor.js
 */
gulp.task("vendor", function (callback) {
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
        .pipe(uglify({}))
        .pipe(gulp.dest('./dist/scripts'));
});

/**
 * Gulp Task
 *
 * Minimazie app.js and copy it to src/app.js
 */
gulp.task("scripts", function () {
    gulp.src([
            './src/js/app.js'
        ])
        .pipe(uglify({}))
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(connect.reload());
});

/**
 * Gulp Tasks
 *
 * Remove assets from dist/assets
 * Optimize assets in src/assets and copy them to dist/assets
 */
gulp.task('assets-optimize', function () {
    new Imagemin()
        .src('./src/assets/*.{gif,jpg,png,svg}')
        .dest('./dist/assets')
        .use(Imagemin.jpegtran({max: 70, progressive: true}))
        .use(Imagemin.optipng({optimizationLevel: 3}))
        .run(function (err, files) {
            console.log(files[0]);
        });
});

gulp.task('assets-clean', function () {
    return gulp.src('./dist/assets/*.*', {read: false})
        .pipe(rimraf());
});

gulp.task('assets', ['assets-clean', 'assets-optimize']);

/**
 * Gulp Task
 *
 * Compile jade to html
 */
gulp.task('jade', function () {
    gulp.src(['./src/views/*.jade'])
        .pipe(jade({
            pretty: false
        }))
        .pipe(prettify({
            unformatted: ['pre', 'code'],
            indent_inner_html: true,
            indegulnt_size: 2,
            brace_style: 'expand'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});


/**
 * Gulp Server
 *
 * Start a server for testing your app.
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
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
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/views/**/*.jade', ['jade']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/assets/**/*.*', ['assets']);
});

/**
 * Gulp Init
 *
 * Initialize all tasks and watchers.
 */
gulp.task('init', ['jade', 'scss', 'vendor', 'scripts', 'assets','watch', 'webserver']);