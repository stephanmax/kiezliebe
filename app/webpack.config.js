const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: Path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      assets: Path.resolve(__dirname, 'assets/')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg)$/,
      use: [
        'file-loader'
      ]
    }]
  },
  devServer: {
    proxy: {
      '/search': 'http://localhost:3001'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
