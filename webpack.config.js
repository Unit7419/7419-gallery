const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '7419/src'),
  mode: 'development',
  entry: {
    app: './app.js',
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '7419/src'),
    disableHostCheck: true,
    port: 7419,
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'react-photo-gallery': path.resolve(__dirname, 'src/Gallery'),
    }
  },
};
