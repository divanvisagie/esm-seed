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
    console.log('register user')
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
