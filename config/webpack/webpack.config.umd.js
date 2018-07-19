const webpack = require('webpack');
var util = require('./util');
const angularExternals = require('webpack-angular-externals');
const rxjsExternals = require('webpack-rxjs-externals');

module.exports = {
	entry: './src/lib/components/index.ts',
    mode: 'development',
	output: {
		path: util.root('dist/bundle'),
		filename: 'core.js',
		libraryTarget: 'umd',
		library: 'angularMdlCore'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	externals: [
        angularExternals(),
        rxjsExternals()
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader?configFileName=./src/tsconfig.json'
			}
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: 'core.js.map',
			test: /\.js($|\?)/i
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
