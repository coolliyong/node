module.exports = async ctx => {
  // 从request对象中取
  //   const {url, request} = ctx
  //   const {querystring, query} = request

  // 从ctx 上下文中取
  const {querystring, query, url,request} = ctx

  console.log('url', url)
  console.log('querystring', querystring)
  console.log('query', query)

  ctx.body = request.body
}
