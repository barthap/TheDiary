const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),
  devtool: 'source-map',
  entry:  [
      'jquery',
      'bootstrap',
      'bootstrap/dist/css/bootstrap.min.css',
    './src/index.js',
    './res/scss/main.scss'
      ]
  ,
  mode: 'production',
  output: {
    path: path.join(__dirname, '../server/public'),
    filename: './js/index.js',
    publicPath: '/',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader'],
        }),
      },
        { test: /\.(woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
      new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new ExtractTextPlugin('css/main.css'),

  ],
};