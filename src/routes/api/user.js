'use strict'

const container = require('../../container')
const RegistrationService = require('../../services/registration-service')

module.exports = router => {
  const registrationService = container.resolve(RegistrationService)

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
}
