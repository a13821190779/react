"use strict";//否则let报错
const path = require('path');
const webpack = require('webpack');
//使用merge
const webpackMerge = require('webpack-merge');
//引入通用配置
const base_config = require("./base.js");



const HtmlWebpackPlugin = require('html-webpack-plugin');//生成html

process.noDeprecation = true; //去除一个现在无关紧要的警告

//把入口文件改为数组，并添加上iddleware/client?noInfo=true&reload=true，否则webpack-hot-middleware不会起作用
const devClient = "./config/dev-client.js";//使用个人设置的配置文件
for (let key in base_config.entry) {
	base_config.entry[key] = [devClient].concat(base_config.entry[key]);
}


const config = webpackMerge(base_config, {
	//决定sourcemap文件的模式
	devtool: "eval-source-map",
	module: {
		rules: [{//处理css不带css-module
			test: /\.css$/,
			include: [path.resolve(__dirname, "../src/static/")],
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: "postcss-loader"
			}]
		}, {//处理scss不带css-module
			test: /\.scss$/,
			include: [path.resolve(__dirname, "../src/static/")],
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: "postcss-loader"
			}, {
				loader: "sass-loader"
			}]
		}, {//处理css
			test: /\.css$/,
			exclude: [path.resolve(__dirname, "../src/static/")],//根据优先级
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {//模块化css
					modules: true,
					localIdentName: '[path][name]__[local]--[hash:base64:5]'
				}
			}, {
				loader: "postcss-loader"
			}]
		}, {//处理scss
			test: /\.scss$/,
			exclude: [path.resolve(__dirname, "../src/static/")],//根据优先级
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {//模块化css
					modules: true,
					localIdentName: '[path][name]__[local]--[hash:base64:5]'
				}
			}, {
				loader: "postcss-loader"
			}, {
				loader: "sass-loader"
			}]
		}]
	},
	plugins: [
		// 开启全局的模块热替换(HMR)
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		//需要有一个html文件指向你的生成的dist，所以使用HtmlWebpackPlugin
		//html插件，本地测试模式下，不压缩，打包快
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../index.html"),
			title: "webpack-native",
			filename: 'index.html',
			inject: true,
		})
	]
});
module.exports = config;
