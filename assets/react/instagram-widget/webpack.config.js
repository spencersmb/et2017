const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const autoprefixer = require('autoprefixer');
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
    new LiveReloadPlugin(options),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './assets/js/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, "src"),
      'node_modules',
      './assets/app/components'
    ],
    alias: {
      applicationStyles$: path.resolve(__dirname,'styles/app.scss'),
      InstagramApi$: path.resolve(__dirname,'assets/app/api/appApi.jsx'),
      InstagramHelpers$: path.resolve(__dirname,'assets/app/api/helpers.jsx'),
      InstagramApp$: path.resolve(__dirname,'assets/app/components/InstagramApp.jsx'),
      InstagramList$: path.resolve(__dirname,'assets/app/components/InstagramList.jsx'),
      InstagramImage$: path.resolve(__dirname,'assets/app/components/InstagramImage.jsx'),
      InstagramModal$: path.resolve(__dirname,'assets/app/components/InstagramModal.jsx')
    }
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        },
        test: [/\.jsx?$/],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            safe: true, // crucial in order not to break anything
            add: true,
            remove: false,
            browsers: ['last 4 versions', '> 2%', 'android 4', 'opera 12']
          }),
        ]
      }
    })
  ]
  // sassLoader:{
  //   includePaths: [
  //     // path.resolve( __dirname, './node_modules/foundation-sites/scss')
  //   ]
  // }
};