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
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          // TODO: Using this to ignore png files referenced by Leaflet CSS
          options: {
            url: false
          }
        }
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
      '/.netlify/functions/search': 'http://localhost:9000/.netlify/functions/search'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
