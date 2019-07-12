module.exports = async (ctx, next) => {
  console.log(`method:${ctx.method} host:${ctx.header.host} url: ${ctx.url}`)
  await next()
}
