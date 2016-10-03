const webpack = require('webpack');

module.exports = {
	entry: './src/lib/components/index.ts',
	output: {
		path: './dist/umd',
		filename: 'angular2-mdl.js',
		libraryTarget: 'umd',
		library: 'angular2Mdl'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	externals: {
		'@angular/core': {
			root: ['ng', 'core'],
			commonjs: '@angular/core',
			commonjs2: '@angular/core',
			amd: '@angular/core'
		},
		'@angular/common': {
			root: ['ng', 'common'],
			commonjs: '@angular/common',
			commonjs2: '@angular/common',
			amd: '@angular/common'
		},
		'@angular/forms': {
			root: ['ng', 'forms'],
			commonjs: '@angular/forms',
			commonjs2: '@angular/forms',
			amd: '@angular/forms'
		},
		'@angular/platform-browser': {
			root: ['ng', 'platformBrowser'],
			commonjs: '@angular/platform-browser',
			commonjs2: '@angular/platform-browser',
			amd: '@angular/platform-browser'
		},
		'rxjs/Subject': {
			root: ['rx', 'Subject'],
			commonjs: 'rxjs/Subject',
			commonjs2: 'rxjs/Subject',
			amd: 'rxjs/Subject'
		},
		'rxjs/Observable': {
			root: ['rx', 'Observable'],
			commonjs: 'rxjs/Observable',
			commonjs2: 'rxjs/Observable',
			amd: 'rxjs/Observable'
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader?tsconfig=./src/tsconfig.json'
			}
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: 'angular2-mdl.js.map',
			test: /\.js($|\?)/i
		})
	]
};
