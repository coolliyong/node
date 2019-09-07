const path = require('path')

const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')

const koaNunjucks = require('koa-nunjucks-2')

const koaStatic = require('koa-static')

const routerConfig = require('./src/router/index.js')
const jsonSend = require('./src/middleware/jsonsend.js')
const log = require('./src/middleware/log.js')

const app = new Koa()

// 日志最外层
app.use(log)

// static 静态资源
app.use(koaStatic(path.join(__dirname, 'public')))

// view 中间件
app.use(
  koaNunjucks({
    ext: 'html', // 后缀名
    path: path.join(__dirname, 'src/views'), // 路径
    nunjucksConfig: {
      //
      trimBlocks: true // 开启转译
    }
  })
)

// body 解析
app.use(
  koaBody({
    // 解析 body 体
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
  })
)

// json  传输 中间件
app.use(jsonSend)

app.use(routerConfig.routes())

// 增加错误的监听处理
app.on('error', (err, ctx) => {
  if (ctx && !ctx.headerSent && ctx.status < 500) {
    ctx.status = 500
    ctx.log.error(err.stack)
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000 ')
})
