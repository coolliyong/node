class ViewController {
  async index(ctx) {
    // ctx.response.body = 'ViewController - index'
    await ctx.render('index', { btnName: 'submit' })
  }
  async home(ctx) {
    ctx.response.body = 'ViewController - home'
  }
  async userDatail(ctx) {
    ctx.response.body = `user:${ctx.params.id}`
  }
  async notFount(ctx) {
    ctx.response.body = 'ViewController - 404'
  }
}

module.exports = new ViewController()
