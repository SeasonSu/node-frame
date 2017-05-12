const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
// 引入基本配置
const config = require('./webpack.config.js');

config.output.publicPath = '';

config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../app/main/index.html'),
        inject: true
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
// var devClient = 'webpack-hot-middleware/client';
const devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    let extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;
