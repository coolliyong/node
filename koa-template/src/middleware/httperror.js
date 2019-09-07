module.exports = async (ctx, next) => {
  try {
    await next()

    // 如果状态码 404 且 body 没有任何东西 认为错误
    if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
  } catch (e) {
    const status = parseInt(e.status)
    const msg = e.message
    if (status >= 400) {
      switch (status) {
        case 404:
        case 400:
        case 500:
          ctx.body = msg
          ctx.log.error(`${status} ${+new Data()}`)
        default:
          break
      }
    } else {
    }
  }
}
