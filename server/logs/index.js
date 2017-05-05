/*============================================================================
 * 日志模块
 ============================================================================*/
const log4js = require("log4js")
const log4js_config = require("./log4js.json")

log4js.configure(log4js_config)

console.log("日志开启")


let logger = log4js.getLogger('log_date')

module.exports = logger
