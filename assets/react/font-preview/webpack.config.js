const localPath = '/Users/yosemetie/Dropbox/development/vhosts/www.everytuesday.dev/wp-content/themes/et2017/node_modules/';
const path = require('path');
const webpack = require('webpack');

const LiveReloadPlugin = require('webpack-livereload-plugin');

const options = {
  port: 35729
};

module.exports = {

  entry: './assets/app/app.jsx',
  externals: {

  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery"
    }),
    new LiveReloadPlugin(options)
  ],
  output: {
    path: __dirname, // font-preview is root of this file
    filename: './assets/js/bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'node_modules',
      './assets/app/components'
    ],
    alias: {
      applicationStyles: 'styles/app.scss',
      FontApp: 'assets/app/components/FontApp.jsx',
      FontInput: 'assets/app/components/FontInput.jsx',
      FontList: 'assets/app/components/FontList.jsx',
      FontListItem: 'assets/app/components/FontListItem.jsx'
    }
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: [/\.jsx?$/],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader:{
    includePaths: [
      // path.resolve( __dirname, './node_modules/foundation-sites/scss')
    ]
  }
};