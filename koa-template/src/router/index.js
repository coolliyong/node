const Router = require('koa-router')

const api = new Router()
const views = new Router({
  // 路由前缀，写这里和use 写的功能一样 ，但是前缀不能是动态参数
  prefix: '/view'
})

// 总路由
const router = new Router()

const VIEW_ROUTER = require('./view')
const API_ROUTER = require('./api')

// 支持路由分层
router.use('/api', API_ROUTER(api).routes()).use(VIEW_ROUTER(views).routes()) // view 上面已经加过了

module.exports = router
