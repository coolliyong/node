class ApiServices {
  async upload(params = {}) {
    // 逻辑校验
    if (!params.id) {
      return false
    }
    return true
  }
}

module.exports = new ApiServices()
