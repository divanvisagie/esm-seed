'use strict'

const container = require('../../container')
const RegistrationService = require('../../services/registration-service')
const LoginService = require('../../services/login-service')

module.exports = router => {
  const registrationService = container.resolve(RegistrationService)
  const loginService = container.resolve(LoginService)

  router.post('/register', (req, res) => {
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

  router.post('/login', (req, res) => {
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
