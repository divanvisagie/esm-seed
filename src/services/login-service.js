const credential = require('credential')
const pw = credential()
const winston = require('winston')

function LoginService (userRepository, tokenService) {
  return {
    login (user, callback) {
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
        const storedHash = data[0].password
        pw.verify(storedHash, user.password, function (err, isValid) {
          if (err) {
            winston.log('info', err)
            return callback(err)
          }
          if (isValid) {
            callback(undefined, {
              token: tokenService.generateTokenForUser(data[0]),
              valid: true
            })
          } else {
            winston.log('info', 'invalid password')
            callback(undefined, { valid: false })
          }
        })
      })
    }
  }
}

module.exports = LoginService
