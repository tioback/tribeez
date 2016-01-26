const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  //devtool: 'eval-source-map',
  entry: './app/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MyTribe'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader','css-loader']
      },
    ]
  }
}