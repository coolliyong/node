module.exports = async ctx => {
  const body = ctx.request.rawBody
  console.log(body)
  ctx.body = '文件上传'
}
