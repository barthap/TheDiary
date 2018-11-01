const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.join(__dirname, '../client'),
    devtool: 'source-map',
    entry: {
        app: [
            'jquery',
            'bootstrap',
            'bootstrap/dist/css/bootstrap.min.css',
            './res/scss/main.scss',
            './src/index.js'
        ]
    },
    mode: 'production',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath: '/demos/TheDiary/'
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
                loader: "source-map-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {test: /\.(woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000'},
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                    }
                }]
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            automaticNameDelimiter: '-'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
            'BASE_URL': JSON.stringify('/demos/TheDiary'),
            'API_URL': JSON.stringify('http://localhost:8081')
        }),
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
        new UglifyJSPlugin({
            sourceMap: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',

        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([path.join(__dirname, '../client/.htaccess')])
    ],
};