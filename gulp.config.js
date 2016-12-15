/**
 * Created by Gabor Molnar
 * 2016. 10. 26..
 */

var gulpConfig = {
    /**
     * File paths
     */
    path : {
        scss : {
            src : './src/scss/app.scss',
            dest: './dist/css'
        },
        less : {
            src : './src/less/app.less',
            dest: './dist/css'
        },
        googleFonts : {
            src : './src/fonts/fonts.list',
            dest: './dist',
            rm  : './dist/fonts'
        },
        vendor : {
            dest: './dist/scripts'
        },
        webpack : {
            app    : './src/js/app.js',
            vendor : './src/js/vendor.js',
            dest   : './dist/scripts'
        },
        image : {
            src : './src/images/*.{gif,jpg,png,svg}',
            dest: './dist/images',
            rm  : './dist/images/*.{gif,jpg,png,svg}'
        },
        pug : {
            src : './src/views/*.pug',
            dest: './dist'
        },
        webserver : {
            root: 'dist'
        },
        watch : {
            webpack: 'src/js/*.js',
            pug    : 'src/views/**/*.pug',
            scss   : 'src/scss/**/*.scss',
            less   : 'src/less/**/*.less',
            images : 'src/images/**/*.{gif,jpg,png,svg}'
        }
    },
    /**
     * Output filenames
     */
    fileName : {
        scss : {
            prefix: '',
            basename : 'app',
            suffix: '.min'
        },
        less : {
            prefix: '',
            basename : 'app',
            suffix: '.min'
        }
    },
    /**
     * Google fonts
     *
     * FontsDir and cssDir are relative to gulp.dest path.
     */
    googleFontsConfig : {
        fontsDir: './fonts',
        cssDir: '../src/scss/base',
        cssFilename: '_fonts.scss'
    }
};

module.exports = gulpConfig;