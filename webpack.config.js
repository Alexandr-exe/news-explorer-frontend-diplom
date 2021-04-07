const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const FontminPlugin = require('fontmin-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		index:'./src/index.js',
    saved: './src/saved-articles/saved.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'scripts/[name].[chunkhash].js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: { loader: "babel-loader" },
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					(isDev ? {loader:'style-loader'} : { loader:MiniCssExtractPlugin.loader,
						options: {
						publicPath:'../'
						}
				}),
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2
					}
				},
					'postcss-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: './images/[name].[ext]',
							esModule: false,
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.90],
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							webp: {
								quality: 75
							}
						}
					},
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css'
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default'],
			},
			canPrint: true
    }),
    new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			template: './src/index.html',
			filename: 'index.html',
			chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/saved.html',
			filename: 'saved.html',
			chunks: ['saved']
    }),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new FontminPlugin({
			autodetect: true,
			glyphs: ['\uf0c8'],
		}),
	]
}