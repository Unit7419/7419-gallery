const path = require('path')
const webpack = require('webpack')
const BundleAnaylzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const mode = ['development', 'localhost'].includes(process.env.NODE_ENV)
  ? 'development'
  : 'production'

module.exports = {
  context: path.resolve(__dirname, '7419/src'),
  mode,
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
    host: '0.0.0.0',
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
  optimization: {
    minimize: true,
    usedExports: true,
    sideEffects: true,
  },
  resolve: {
    alias: {
      'react-photo-gallery': path.resolve(__dirname, 'src/Gallery'),
    },
  },
  plugins: [
    new BundleAnaylzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
