const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const colors = require('colors')
const bs = require('browser-sync').create();
const express = require('express')
const app = express()
const opn = require('opn')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const connectHistoryApiFallBack = require('connect-history-api-fallback')
const path = require('path')
const config = require(path.join(__dirname, 'webpack.config'))
const port = process.env.PORT || 8090
/**
 * 设置confg，hot参数
 */
const setConfig = function(){
    var extras = ['./dev-client'];
//    var extras = ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
    Object.keys(config.entry).forEach(function(name) {
        config.entry[name] = extras.concat(config.entry[name])
    })
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    )
    return config
}
var compiler = webpack(setConfig())
var proxyMiddleware = require('http-proxy-middleware')
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    },
})
var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})
app.use(devMiddleware)
app.use(hotMiddleware)
app.use(express.static(config.output.path))
app.use(require('connect-history-api-fallback')())
app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(colors.green('服务已开启，端口:'+port))
//    opn('http://localhost:'+port)
})
