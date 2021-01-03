const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: { loader: "babel-loader" },
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
		}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			inject: false,
			template: './src/index.html',
			filename: 'index.html'
		}),
		new CleanWebpackPlugin(),
	]
}; 