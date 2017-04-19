const webpack = require('webpack')
const glob = require('glob')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const colors = require('colors')
const path = require('path')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const express = require('express')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const argv = require('minimist')(process.argv.slice(2))
const bs = require('browser-sync').create();
let bsFlag = false
const gulp = require('gulp')
/**
 * 编译配置
 * @type {Object}
 */
const setting = {
    src:'./src', // 源文件目录
    release:'./dist' // 编译后文件
}
/**
 * 获取配置
 * @return {[type]} [description]
 */
const getConf = function(){
    let config = {
        entry:{
        },
        output: {
            path:path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name]-[hash].js',
            chunkFilename:"[id].chunk.js"
        },
        module: {
            loaders: [
                {
                        test: /\.vue$/,
                        exclude: /node_modules/,
                        loader: 'vue'
                    },
                    {
                        test: /\.html$/,
                        loader: 'html'
                    },
                    {
                        test: /\.(js|jsx)$/,
                        loader: 'babel',
                        query: {
                            presets: [
                                require.resolve('babel-preset-react'),
                                require.resolve('babel-preset-es2015')
                            ]
                        },
                        include: path.resolve(process.cwd(), './'),
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(png|jpg|gif|svg|mp3|wav|ogg|json)$/,
                        loaders: [
                            'url?limit=1024&hash=sha512&digest=hex&name=[name]-[hash].[ext]'
                        ]
                    }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.json', '.scss','.hbs','.html'],
            alias: {
                'vue': 'vue/dist/vue.js'
            }
        },
        plugins:[
        //    new MyPlugin({options: ''}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
        ],
    }
    config.entry = entries()
    // 处理html
    config.plugins = config.plugins.concat(htmlPlugins())
    // 处理版本控制
    if(checkEnvPro()){
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        )
    }else{
    //    config.devtool = '#source-map'
    }
    return config
}
/**
 * 获取入口文件
 * @return {[type]} [description]
 */
const entries = function(){
    let targetJs = path.resolve(setting.src, 'entries')
    console.log(colors.red(targetJs))
    let entryFiles = glob.sync(targetJs + '/*.{js,jsx}')
    let map = {}
    let targetFiles = glob.sync(setting.release + '/*.{js,css,html}')
    entryFiles.forEach(function (entry) {
        let fileName = entry.substring(entry.lastIndexOf('\/') + 1, entry.lastIndexOf('.'))
        map[fileName] = path.resolve(__dirname,entry)
        /**
         * 清理上个版本文件
         * @type {[type]}
         */
        targetFiles.forEach(function(file){
            let sourceName = file.substring(file.lastIndexOf('\/') + 1, file.lastIndexOf('-'))
        	let htmlName = file.substring(file.lastIndexOf('\/') + 1, file.lastIndexOf('.'))
            if(sourceName == fileName || htmlName == fileName){
                !argv.hot && fs.existsSync(file) && fs.unlinkSync(file)
            }
        })
    })
    return map
}
/**
 * 处理html-views
 * @return {[type]} [description]
 */
const htmlPlugins = function () {
    let entryHtml = glob.sync(setting.src + '/views/*.html')
    let plugins = []
    entryHtml.forEach(function(entry){
        let filePath = path.join(__dirname, entry)
        let fileName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        plugins.push(new HtmlWebpackPlugin({
    		chunks: [fileName],
        	cache:false,
            filename: fileName + '.html',
            inject:true,
            hash:true,
            template:filePath,
            minify:checkEnvPro() ? { removeAttributeQuotes: true } : false,
        	// templateContent: function(templateParams, compilation){
        	// 	let contentStr = fs.readFileSync(filePath).toString()
        	// 	return contentStr
        	// }
        }))
    })
    return plugins
}
/**
 * 检查版本，增加版本功能控制
 * @return {[type]} [description]
 */
const checkEnvPro = function(){
    if (process.env.NODE_ENV === 'production') {
        return true
    } else {
        return false
    }
}
/**
 * 监听html
 * @return {[type]} [description]
 */
const browserSync = function(){
    if(bsFlag){
        return
    }
     bsFlag = true
    bs.init({
        server: {
            baseDir: setting.release
        },
        files: ['./src/**'],
        port: 8090,
        files: [
            {
                match: ['./src/**'],
                fn: function (event, file) {
                    if (event === 'change') {
                        webpack(getConf(),function(){
                            bs.reload();
                        })
                    }
                }
            }
        ]
    });
}
function MyPlugin(options) {}
MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    //  console.log(colors.red('compilation'))
    //  browserSync()
  });
};
module.exports = getConf()
