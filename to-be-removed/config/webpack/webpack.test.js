const webpack = require('webpack');
const util = require('./util');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {

	devtool: 'inline-source-map',
    mode: 'development',
  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {

    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?configFileName=./src/tsconfig-test.json']
      },
			{
				enforce: 'post',
				test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true',
				include: util.root('src', 'lib'),
				exclude: [
					/\.(spec)\.ts$/,
					/\.(vendor)\.ts$/
				]
			}
    ]
  },

	plugins: [
		// avoid: WARNING in ./~/@angular/core/@angular/core.es5.js
		// 3702:272-293 Critical dependency: the request of a dependency is an expression
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/@angular(\\|\/)core(\\|\/)@angular/,
			util.root('src') // location of your src
		)
	]

};
