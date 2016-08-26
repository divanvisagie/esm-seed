'use strict'

module.exports = (app, options) => {
  const { registrationService, loginService } = options
  const root = '/api/user'

  app.post(`${root}/register`, (req, res) => {
    const user = req.body
    registrationService.registerUser(user, (err, data) => {
      if (err) {
        return res.send({
          message: 'user registration failed'
        })
      }
      res.send({
        message: 'user registered'
      })
    })
  })

  app.post(`${root}/login`, (req, res) => {
    const user = req.body
    loginService.login(user, (err, data) => {
      if (err) {
        return res.send({
          message: `user login failed ${err}`
        })
      }
      res.send(data)
    })
  })
}
