/**
 * Created by Gábor on 2016. 10. 26..
 */

var gulpConfig = {
    path : {
        scss : {
            src : './src/scss/app.scss',
            dest: './dist/css'
        },
        vendor : {
            dest: './dist/scripts'
        },
        webpack : {
            src : './src/js/app.js',
            dest: './dist/scripts'
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
            images : 'src/images/**/*.{gif,jpg,png,svg}'
        }
    },
    fileName : {
        scss : {
            prefix: '',
            basename : 'app',
            suffix: '.min'
        },
        vendor : {
            prefix: '',
            basename : 'vendor',
            suffix: '.min'
        },
        webpack : {
            prefix: '',
            basename : 'app',
            suffix: '.min'
        }
    }
};

module.exports = gulpConfig;