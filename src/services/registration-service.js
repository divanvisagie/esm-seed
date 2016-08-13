const credential = require('credential')
const pw = credential()

function RegistrationService (userRepository) {
  return {
    registerUser (user, callback) {
      if (!user.username) {
        return callback('username not found')
      }
      if (!user.password) {
        return callback('no password in request')
      }
      userRepository.findUserByUsername(user.username, (err, data) => {
        if (err) {
          return callback(err)
        }
        if (data.length === 0) {
          pw.hash(user.password, function (err, hash) {
            if (err) { throw err }
            user.password = hash
            userRepository.createUser(user, callback)
          })
        } else {
          callback('user already exists')
        }
      })
    }
  }
}

module.exports = RegistrationService
