const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/index')[env]
const utils = require('../utils/index')
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const dbStorage = []
const modelRoot = process.cwd() + '/models'
const models = utils.getFiles(modelRoot)

models.map(function(file){
    let model = sequelize.import(path.join(modelRoot,file))
    dbStorage[model.name] = model
})

module.exports = dbStorage
