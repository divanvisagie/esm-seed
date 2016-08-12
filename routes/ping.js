'use strict'

module.exports = router => {
  router.get('/', (req, res) => {
    res.send('pong')
  })

  router.get('/test', (req, res) => {
    res.send('pong test')
  })
}
