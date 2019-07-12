const path = require('path')
const Koa = require('koa')
const fs = require('fs')
const koaBody = require('koa-body')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

app.use(koaBody({multipart: true}))


router.post('/uploadfile', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.body.file // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  return (ctx.body = '上传成功！')
})

app.use(router.routes())
app.listen(3000)
