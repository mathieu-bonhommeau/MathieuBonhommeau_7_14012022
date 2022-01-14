const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    polyfill: 'babel-polyfill',
    index: '/public/js/pages/index.js',
    photographer: '/public/js/pages/photographer-page.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}