module.exports = async ctx => {
  let content = '123'
  await ctx.render('index.ejs', {
    content,
  })
}
