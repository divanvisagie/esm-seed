'use strict'

const pingService = require('../../services/ping-service')()

module.exports = router => {
  router.get('/', (req, res) => {
    res.send(pingService.get())
  })
}
