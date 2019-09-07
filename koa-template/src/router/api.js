const ApiController = require('../controller/api.js')

module.exports = router => {
  return router
    .post('/upload', ApiController.upload)
    .get('/list', ApiController.list)
}
