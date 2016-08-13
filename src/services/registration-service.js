const credential = require('credential')
const pw = credential()

function RegistrationService (userRepository) {
  return {
    registerUser (user, callback) {
      if (!user.password) {
        return callback('no password in request')
      }
      pw.hash(user.password, function (err, hash) {
        if (err) { throw err }
        user.password = hash
        userRepository.createUser(user, callback)
      })
    }
  }
}

module.exports = RegistrationService
