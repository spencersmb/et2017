
const path = require('path');

const LiveReloadPlugin = require('webpack-livereload-plugin');

const options = {
  port: 35729
};

module.exports = {
  
  entry: './assets/app/app.js',
  output: {
    path: __dirname,
    filename: './assets/js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.php']
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
  plugins: [
    new LiveReloadPlugin(options)
  ]
};