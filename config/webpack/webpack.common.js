var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var util = require('./util');

let postCssLaoder = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: util.root('config','webpack','postcss.config.js')
		}
	}
};

module.exports = {

	entry: {
		'polyfills': './src/demo-app/polyfills.ts',
		'app': './src/demo-app/main.ts'
	},

	resolve: {
		extensions: ['.js', '.ts'],
    modules: [util.root('src'), util.root('node_modules')],
	},

	module: {
		rules: [
				{
					test: /\.ts$/,
					loaders: ['awesome-typescript-loader?configFileName=./src/tsconfig.json', 'angular2-template-loader'],
					exclude: [
						/\.(spec)\.ts$/
					]
				},
				{
					test: /\.html$/,
					loader: 'html-loader',
					query: {
						minimize: false
					}
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
			   	loader: 'file-loader?name=assets/[name].[ext]'
				},
				{
					test: /\.scss$|\.sass$/,
			   	include: [util.root('src', 'demo-app', 'css')],
					use: ExtractTextPlugin.extract({
						use: [
							"css-loader",
                            postCssLaoder,
							"sass-loader"
						],
						// use style-loader in development
						fallback: "style-loader"
					})
				},
				{
					test: /\.scss$/,
					include: [util.root('src', 'demo-app', 'app'), util.root('src', 'lib', 'components')],
					loaders: [
						'raw-loader',
                        postCssLaoder,
						'sass-loader']
				},
				{
					test: /\.hbs$/,
					loader: 'handlebars-loader'
				}
		]
	},


	plugins: [
		// avoid: WARNING in ./~/@angular/core/@angular/core.es5.js
		// 3702:272-293 Critical dependency: the request of a dependency is an expression
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/@angular(\\|\/)core(\\|\/)esm5/,
			util.root('src') // location of your src
		),
    	new CopyWebpackPlugin([{ from: util.root('src', 'demo-app', 'assets') , to: 'assets'}], {copyUnmodified: true}),
			new webpack.optimize.CommonsChunkPlugin({
      			name: ['polyfills']
		}),
    	new webpack.LoaderOptionsPlugin({}),
		new HtmlWebpackPlugin({
			template: '!!handlebars-loader!src/demo-app/index.hbs',
			baseUrl: process.env.NODE_ENV === 'production' ? '/angular2-mdl/' : '/',
			production: process.env.NODE_ENV === 'production' ? true : false
		})
	]
};
