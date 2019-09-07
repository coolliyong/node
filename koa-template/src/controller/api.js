const apiServices = require('../service/api')

class ApiController {
  async list(ctx) {
    ctx.send(1, {
      a: 1
    })
  }
  async upload(ctx) {
    const body = ctx.request.body
    // ctx.body = ctx.request.body
    const files = ctx.request.files
    // 数据封装到 services 层，然后返回出结果
    const result = await apiServices.upload(body)
    const bodyData = {
      message: 'success',
      status: 0
    }
    if (result) {
      bodyData.status = 1
    }
    ctx.body = bodyData
  }
}

module.exports = new ApiController()
