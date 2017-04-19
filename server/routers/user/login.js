const Router = require('koa-router')
const router = new Router()
const body = require('koa-body')()
const colors = require('colors')
const modules = require(process.cwd() + '/services/index')
const codes = require(process.cwd() + '/codes/index')
const utils = require(process.cwd() + '/utils/index')
/**
 * 检查用户存在
 * @param  {[type]} userName [description]
 * @return {[type]}          [description]
 */
const checkUserExit = async (username) => {
    if(!username){
        return
    }
    return new Promise((resolve, reject) => {
        modules.users.findAll({
            where: {
                username: username,
            }
        }).then((result)=>{
            if(result && result.length > 0){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}
router.post('/login',body, async (ctx) => {
    ctx.set('Access-Control-Allow-Method', 'POST');
    ctx.set('Access-Control-Allow-Origin', '*')
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    if(!username || !password){
        ctx.body = codes.set('2')
        return
    }
    // 是否存在用户
    let isExit = await checkUserExit(username)
    let data = {isExit:isExit}
    console.log(data)
    ctx.body = utils.extend(codes.set('0'),data)
})
router.get('/getUser/:id', async (ctx,next) => {
  let  id = ctx.params.id;
  await modules.users.findAll({
        where: {
            id: id,
        }
    }).then((result)=>{
        ctx.body = JSON.stringify(result)
  })
});
module.exports = router
