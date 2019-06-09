var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var util = require('./util');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
    mode: 'production',
	output: {
		path: util.root('dist'),
		publicPath: '',
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js'
	},
    optimization: {
        minimize: true
	},
	plugins: [
		new CopyWebpackPlugin([{ from: util.root('src', 'demo-app', '404.html') }], {copyUnmodified: true}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			//minimize: true, do not minimize for any loader - this will result in weird, unpredictable behavior
			debug: false
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	]
});
