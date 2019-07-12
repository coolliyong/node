const Router = require('koa-router')

const home = new Router()

home.get('/', async ctx => {
  ctx.body = `home get!`
})

home.put('/', async ctx => {
  ctx.body = `home put!`
})

home.post('/', async ctx => {
  ctx.body = `home post!`
})

const datail = new Router()

datail.get('/', async ctx => {
  ctx.body = `datail get!`
})

module.exports = {
  home,
  datail,
}
