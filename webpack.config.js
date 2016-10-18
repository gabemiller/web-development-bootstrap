var webpackConfig = {
    output: {
        filename: "app.min.js"
    },
    target: "node",
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = webpackConfig;