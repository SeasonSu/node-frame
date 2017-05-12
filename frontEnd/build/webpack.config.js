// nodejs 中的path模块
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const minimist = require('minimist')
const options = minimist(process.argv.slice(2)) || {}
const fs = require('fs')

//删除文件
const deleteFolder = function(path) {
    let files = []
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(function(file,index){
            let curPath = path + "/" + file
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath)
            } else { // delete file
                fs.unlinkSync(curPath)
            }
        });
        fs.rmdirSync(path)
    }
}

let config = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        index: [
        //    './build/dev-client.js',
            path.resolve(__dirname, '../app/main/main.js')
        ]
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output'),
        publicPath: '',
        filename: '[name]-[hash].js',
        chunkFilename: '[id]-[chunkhash].js'
    },
    resolve: {
        extensions: [' ', '.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../app/main/index.html'),
            inject: true,
        })
    ]
}

if(!options.p){
    config.entry.index.push('./build/dev-client.js')
}else{
    deleteFolder(config.output.path)
}



module.exports = config
