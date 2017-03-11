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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.LoaderOptionsPlugin({
			//minimize: true, do not minimize for any loader - this will result in weird, unpredictable behavior
			debug: false
		}),
		// SyntaxError: Unexpected token: name (AnimationEngine)
		// https://github.com/angular/angular/issues/14737
		new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	]
});
