const ViewController = require('../controller/view.js')

module.exports = router => {
  router
    .get('/', ViewController.index)
    .get('/home', ViewController.home)
    .get('/user/:id', ViewController.userDatail)
    .get('/404', ViewController.notFount)

  return router
}
