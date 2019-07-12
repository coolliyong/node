const path = require('path')
const Koa = require('koa')
const RouterMiddle = require('koa-router')
const bodyParserMiddle = require('koa-bodyparser')
const staticMiddle = require('koa-static')
const viewsMiddle = require('koa-views')

const {home, datail} = require('./src/router')
const loggerAsync = require('./src/log_middler')
const getReqParams = require('./src/get_req_params')
const cookiesFn = require('./src/cookies')
const viewFn = require('./src/view_template')
const fileUpload = require('./src/file_upload')
const sqlAction = require('./src/mysql_example')

const app = new Koa()

// 中间件

app.use(loggerAsync)
// post body 解析
app.use(bodyParserMiddle())
// 静态资源
app.use(staticMiddle(path.join(__dirname, './static/')))
// views 模板 ejs
app.use(
  viewsMiddle(path.join(__dirname, './view'), {
    exension: 'ejs',
  })
)

const router = new RouterMiddle()

router.use('/', home.routes(), home.allowedMethods())
router.use('/datail', datail.routes(), home.allowedMethods())

// 获取参数
router.get('/params', getReqParams)
router.post('/params', getReqParams)

// cookie处理
router.get('/cookie', cookiesFn)

// view
router.get('/view/index', viewFn)

// 文件上传
router.post('/fileupload', fileUpload)
// sql联系
router.get('/sql/example', sqlAction)

app.use(router.routes())
// app.use(datail.routes())

app.listen(3000)
console.log('the server is starting at port 3000')
