const path = require('path'),
  process = require('process'),
  webpack = require('webpack'),
  isPROD = process.env.NODE_ENV === 'production',
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  uglifyjs = require('uglifyjs-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

if (isPROD) console.warn("### You are using PRODUCTION mode ###");

const PATH = {
  REDUX_THUNK: path.resolve(__dirname, 'redux-thunk'),
  REDUX_SAGA: path.resolve(__dirname, 'redux-saga'),
  MOBX: path.resolve(__dirname, 'mobx'),
  TMP: path.resolve(__dirname, '.tmp'),
  BABEL_CACHE: path.resolve(__dirname, '.tmp/.cache')
};

const BASE_CONFIG = {
  mode: isPROD ? 'production' : 'development',
  entry: {
    'redux-thunk': path.join(PATH.REDUX_THUNK, 'index.js'),
    'redux-saga': path.join(PATH.REDUX_SAGA, 'index.js'),
    'mobx': path.join(PATH.MOBX, 'index.js')
  },
  output: {
    path: PATH.TMP,
    filename: './[name]/react.[name].bundle.js'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
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

const PROD_CONFIG = {
  plugins: [
    new uglifyjs({
      parallel: 4,
      uglifyOptions: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so userList can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ENV': JSON.stringify('production')
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
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
  ],
//  resolve.alias = {
//   "react": "preact-compat",
//   "react-dom": "preact-compat",
//   "react-redux": "preact-redux"
// };
};

const DEV_CONFIG = {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    publicPath: "/",
    contentBase: [
      PATH.TMP
    ],
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://127.0.0.1:8081'
    }
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      filename: 'thunk/index.html',
      template: path.resolve(PATH.REDUX_THUNK, 'index.html'),
      chunks: ['redux-thunk', 'vendors', 'runtime']
    }),
    new HtmlWebpackPlugin({
      filename: 'saga/index.html',
      template: path.resolve(PATH.REDUX_SAGA, 'index.html'),
      chunks: ['redux-saga', 'vendors', 'runtime']
    }),
    new HtmlWebpackPlugin({
      filename: 'mobx/index.html',
      template: path.resolve(PATH.MOBX, 'index.html'),
      chunks: ['mobx', 'vendors', 'runtime']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      chunks: []
    })
  ]
};

const TARGET_CONFIG = Object.assign(BASE_CONFIG, isPROD ? PROD_CONFIG : DEV_CONFIG);

if (process.env.INSPECT) {
  TARGET_CONFIG.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

exports.default = TARGET_CONFIG;
