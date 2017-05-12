const Router = require('koa-router')
const router = new Router()
const body = require('koa-body')()
const colors = require('colors')
const modules = require(process.cwd() + '/services/index')
const codes = require(process.cwd() + '/codes/index')
const utils = require(process.cwd() + '/utils/index')
const logs = require(process.cwd() + '/logs/index')


router.get('/get', async (ctx,next) => {
    ctx.set('Access-Control-Allow-Method', 'GET');
    ctx.set('Access-Control-Allow-Origin', '*')
    await modules.get.findAll().then((result)=>{
        ctx.body = JSON.stringify(result)
    })
});


module.exports = router
