var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var util = require('./util');
var autoprefixer = require('autoprefixer');

module.exports = {

	entry: {
		'polyfills': './src/demo-app/polyfills.ts',
    'vendor': './src/demo-app/vendor.ts',
		'app': './src/demo-app/main.ts'
	},

	resolve: {
		extensions: ['.js', '.ts'],
		//mainFields: ["module", "main", "browser"]
	},

  // avoid errors like Error: Can't resolve 'net' in '...angular2-mdl/node_modules/debug'
  node: {
    fs: 'empty',
    net: 'empty'
  },

	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader?tsconfig=./src/tsconfig.json', 'angular2-template-loader'],
				exclude: [
					/\.(spec)\.ts$/
				]
			},
			{
				test: /\.html$/,
				loader: 'html',
				query: {
					minimize: false
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[ext]'
			},
			{
				test: /\.scss$|\.sass$/,
        include: [util.root('src', 'demo-app', 'css')],
				loaders: [
					ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' }),
					'css-loader',
					'postcss-loader',
					'sass-loader']
			},
			{
				test: /\.scss$/,
				include: [util.root('src', 'demo-app', 'app'), util.root('src', 'lib', 'components')],
				loaders: ['raw-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars'
			}
		]
	},


	plugins: [
		// should fix: https://github.com/angular/angular/issues/11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			util.root('src')
		),
    new CopyWebpackPlugin([{ from: util.root('src', 'demo-app', 'assets') , to: 'assets'}], {copyUnmodified: true}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer];
        }
      }
    }),
		new HtmlWebpackPlugin({
			template: '!!handlebars!src/demo-app/index.hbs',
			baseUrl: process.env.NODE_ENV == 'production' ? '/angular2-mdl/' : '/',
			production: process.env.NODE_ENV == 'production' ? true : false
		})
	]
};
