
var util = require('./util');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?tsconfig=./src/tsconfig.json', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw'
      }
    ]
  },

  plugins: []

};
