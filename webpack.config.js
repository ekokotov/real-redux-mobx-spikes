const path = require('path'),
  process = require('process'),
  webpack = require('webpack'),
  isPROD = process.env.ENV === 'production',
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || process.env.ENV;

const PATH = {
  SRC: path.resolve(__dirname, 'client'),
  DIST: path.resolve(__dirname, '.tmp'),
  BABEL_CACHE: path.resolve(__dirname, '.tmp/.cache')
};

const CONFIG = {
  entry: [
    path.join(PATH.SRC, 'index.jsx')
  ],

  output: {
    path: PATH.DIST,
    filename: 'react.[name].bundle.js'
  },

  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {'modules': false}], "stage-2"],
              cacheDirectory: PATH.BABEL_CACHE
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: PATH.BABEL_CACHE
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
};

if (isPROD) {
  console.warn("### You are using PRODUCTION mode ###");
  // CONFIG.resolve.alias = {
  //   "react": "preact-compat",
  //   "react-dom": "preact-compat",
  //   "react-redux": "preact-redux"
  // };
  CONFIG.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1,
      moveToParents: true,
      output: {
        comments: false // remove all comments
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  );

} else {
  CONFIG.devtool = "cheap-module-eval-source-map";
  CONFIG.devServer = {
    publicPath: "/",
    contentBase: [
      PATH.DIST,
      PATH.SRC
    ],
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://127.0.0.1:8081'
    }
  };
}

if (process.env.INSPECT) {
  CONFIG.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

exports.default = CONFIG;
