var webpack = require('webpack');

var webpackConfig = {
    output:{
        filename : '[name].min.js'
    },

    devtool: 'sourcemap',

    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app','vendor']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = webpackConfig;