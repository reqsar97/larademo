var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [{
      test: /\.js$/, // запустим загрузчик во всех файлах .js
      exclude: /node_modules/, // проигнорируем все файлы в папке  node_modules
      use: 'jshint-loader'
    }]
  }
};
