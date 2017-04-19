/*============================================================================
 * server入口
 ============================================================================*/
const Koa = require('koa');
const router = require('../routers/index')
const app = new Koa();
const http = require('http')
const views = require('koa-views')
const colors = require('colors')
// const cors = require('koa-cors')
const config = require('../config')
const logger = require('koa-logger')
// 引入模版views
// app.use(views(__dirname + '/views', { extension: 'jade' }))
app.use(views( __dirname + '/views', {
    extension: 'hbs',
    map: { hbs: 'handlebars' }
}));
// 引入路由
app.use(router.routes())
	.use(router.allowedMethods());
// 跨域
// app.use(cors())
// 日志
app.use(logger())
// 开启服务
let server = http.createServer(app.callback());
server.listen(config.base.port);
console.log(colors.red('服务已开启：端口'+ config.base.port))
