/*eslint-env node*/
/*eslint-disable no-console*/
'use strict'

let user_config
try {
  user_config = require('./config.json')
} catch (err) {
  console.error(err.toString())
  console.error('Could not load configuration file. You must copy `config.dist.json` into `config.json` and edit it with your settings.')
  process.exit()
}

const execSync = require('child_process').execSync
const revision = execSync('git rev-parse HEAD', {cwd: __dirname}).toString().split('\n').join('')

const env = process.env.NODE_ENV || 'development'
console.log('Building for', env)

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const autoprefixer = require('autoprefixer')
const reactCssModules = require('react-css-modules')

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'SortMyTribe',
  template: 'app/index.tpl.html',
  env: env,
  rollbar_token: user_config.rollbar_token,
  revision: revision,
})

const definePlugin = new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify(env)},
  __API_ENDPOINT__: JSON.stringify(user_config.api_endpoint),
  __RECAPTCHA_SITE_KEY__: JSON.stringify(user_config.recaptcha_site_key),
  __DEBUG__: (env === 'development'),
})

const configs = {
  development: {
    debug: true,
    devtool: 'source-map', // eval
    plugins: [
      new CleanWebpackPlugin(['dist']),
      htmlPlugin,
      definePlugin,
    ],
  },
  production: {
    debug: false,
    devtool: 'cheap-module-source-map', // or even null for no sourcemap
    plugins: [
      htmlPlugin,
      definePlugin,
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    ],
  },
}

const config = configs[env]

// common config:
Object.assign(config, {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: `${revision}.js`,
    publicPath: '/',
  },
  // eslint: {
  //   fix: true,
  // },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'babel!svg-react',
      },
    ],
  },
  postcss: function() {
    return [autoprefixer, reactCssModules]
  },
})

module.exports = config
