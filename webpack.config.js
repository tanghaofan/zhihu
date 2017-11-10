var webpack = require("webpack");
// var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
// var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': "jquery"});
module.exports = {
    entry: './src/js/zhihu.js', 
    output: {
        path: __dirname + './static/',
        publicPath: "http://localhost:8080/static/",
        filename: "index.js"
    },
    module: {
        rules: [
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0')
                    ]
                }
            },
            {test: /\.(jpg|png)$/, loader: "url-loader"}
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        providePlugin,
        new webpack.NoEmitOnErrorsPlugin()
    ]
}