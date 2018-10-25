const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '../client'),
    devtool: 'inline-source-map',
    entry: [
            'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'jquery',
        'bootstrap',
        'bootstrap/dist/css/bootstrap.min.css',
        './res/scss/main.scss',
        './src/index.js'
        ]
    ,
    mode: 'development',
    output: {
        path: path.join(__dirname, '../server/public'),
        filename: './js/index.js',
        publicPath: '/',
    },
    devServer: {
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
        stats: "minimal",
        port: 3000
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '*']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-1'],
                },
            },
        },
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    /node_modules\/react-rte/
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.(woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../server/views/index.dev.ejs'),
            inject: false,
        }),
    ],
};