const fs = require('fs')
const path = require('path')
const colors = require('colors')
const utils = require('./utils')

utils.prototype.getFiles = function(root){
    let fileArray = []
    const getDeepFiles = function(fileRoot,parentRoot){
        fs.readdirSync(fileRoot)
        .forEach(function (file) {
            if(file == 'index.js'){
                return
            }
            let curPath = fileRoot + '/' + file
            if(fs.statSync(curPath).isDirectory()){
                getDeepFiles(curPath,file)
            }else{
                if(parentRoot){
                    fileArray.push(parentRoot + '/' + file)
                }else{
                    fileArray.push(file)
                }
            }
        })
    }
    getDeepFiles(root)
    return fileArray
}
