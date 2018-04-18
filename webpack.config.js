const path = require('path'),
  process = require('process'),
  webpack = require('webpack'),
  isPROD = process.env.ENV === 'production',
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || process.env.ENV;

const PATH = {
  REDUX_THUNK: path.resolve(__dirname, 'redux-thunk'),
  REDUX_SAGA: path.resolve(__dirname, 'redux-saga'),
  TMP: path.resolve(__dirname, '.tmp'),
  BABEL_CACHE: path.resolve(__dirname, '.tmp/.cache')
};

const CONFIG = {
  entry: {
    'redux-thunk': path.join(PATH.REDUX_THUNK, 'index.js'),
    'redux-saga': path.join(PATH.REDUX_SAGA, 'index.js')
  },

  output: {
    path: PATH.TMP,
    filename: './react.[name].bundle.js'
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
      template: path.resolve('index.html'),
      chunks:[]
    }),
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
        warnings: false, // good for prod apps so userList can't peek behind curtain
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
      PATH.TMP
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
