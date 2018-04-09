const webpack = require('webpack');
var util = require('./util');
const rxPaths = require('rxjs/_esm5/path-mapping');

module.exports = {
	entry: './src/lib/components/index.ts',
	output: {
		path: util.root('dist/bundle'),
		filename: 'core.js',
		libraryTarget: 'umd',
		library: 'angularMdlCore'
	},
	resolve: {
		extensions: ['.ts', '.js'],
		// Use the "alias" key to resolve to an ESM distribution
		alias: rxPaths()
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
		'@angular/platform-browser-dynamic': {
			root: ['ng', 'platformBrowserDynamic'],
			commonjs: '@angular/platform-browser-dynamic',
			commonjs2: '@angular/platform-browser-dynamic',
			amd: '@angular/platform-browser-dynamic'
		},
		'@angular/animations': {
			root: ['ng', 'animations'],
			commonjs: '@angular/animations',
			commonjs2: '@angular/animations',
			amd: '@angular/animations'
		},
		'@angular/platform-browser/animations': {
			root: ['ng', 'platformBrowserAnimations'],
			commonjs: '@angular/platform-browser/animations',
			commonjs2: '@angular/platform-browser/animations',
			amd: '@angular/platform-browser/animations'
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
		},
    'rxjs/BehaviorSubject': {
      root: ['rx', 'BehaviorSubject'],
      commonjs: 'rxjs/BehaviorSubject',
      commonjs2: 'rxjs/BehaviorSubject',
      amd: 'rxjs/BehaviorSubject'
    }
	},
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
