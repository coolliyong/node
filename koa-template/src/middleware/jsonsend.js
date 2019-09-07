module.exports = async (ctx, next) => {
  ctx.send = (statusCode = 1, data = {}, message = 'success') => {
    ctx.set('Content-Type', 'application/json')
    ctx.log.info('info log')
    ctx.body = JSON.stringify({
      status: statusCode,
      data,
      message
    })
  }
  await next()
}
