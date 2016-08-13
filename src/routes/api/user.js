'use strict'

const mockRepository = {
  createUser (user, callback) {
    callback(null, 'mock')
  }
}

const RegistrationService = require('../../services/registration-service')
const registrationService = RegistrationService(mockRepository)

module.exports = router => {
  router.post('/register', (req, res) => {
    registrationService.registerUser(null, (err, data) => {
      if (err) {
        return res.send({
          message: 'user creation failed'
        })
      }
      res.send({
        message: 'user created'
      })
    })
  })
}
