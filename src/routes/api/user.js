'use strict'

const container = require('../../container')
const RegistrationService = require('../../services/registration-service')
const LoginService = require('../../services/login-service')

module.exports = router => {
  const registrationService = container.resolve(RegistrationService)
  const loginService = container.resolve(LoginService)

  router.post('/register', (req, res) => {
    registrationService.registerUser(null, (err, data) => {
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
    res.send({token: ''})
  })
}
