const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src/scripts/index.js')
	},
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.html$/i,
				use: 'raw-loader',
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			inject: 'body',
			excludeChunks: ['sw']
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/public'),
					to: path.resolve(__dirname, 'dist'),
					globOptions: {
						ignore: ['**/index.html']
					}
				},
				{
					from: path.resolve(__dirname, 'src/scripts/sw.js'),
					to: path.resolve(__dirname, 'dist/sw.js'),
					transform(content) {
						// Replace process.env.NODE_ENV in service worker
						return content.toString().replace(
							/process\.env\.NODE_ENV/g,
							`'${process.env.NODE_ENV || 'development'}'`
						);
					}
				}
			]
		})
	]
}