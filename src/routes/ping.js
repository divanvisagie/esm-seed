'use strict'

module.exports = (app, options) => {
  const { pingService } = options
  const root = '/api/ping'

  app.get(`${root}/`, (req, res) => {
    res.send(pingService.get())
  })
}
