'use strict'

const UserRepository = require('../../repositories/user-repository')
const container = require('../../container')
const RegistrationService = require('../../services/registration-service')
const registrationService = RegistrationService(
  container.resolve(UserRepository)
)

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
