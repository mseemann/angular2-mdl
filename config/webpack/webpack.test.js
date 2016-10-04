const webpack = require('webpack');
const util = require('./util');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {

	devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {

    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?tsconfig=./src/tsconfig-test.json']
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
		// should fix: https://github.com/angular/angular/issues/11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			util.root('src') // location of your src
		)
	]

};
