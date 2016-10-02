var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var util = require('./util');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',

	output: {
		path: util.root('dist'),
		publicPath: '',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},

	plugins: [
		new CopyWebpackPlugin([{ from: util.root('src', 'demo-app', '404.html') }], {copyUnmodified: true}),
		new webpack.NoErrorsPlugin(),
		// waiting for fix: https://github.com/webpack/webpack/issues/2644
		// new webpack.optimize.DedupePlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
      comments: false
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	]
});
