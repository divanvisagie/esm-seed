const credential = require('credential')
const pw = credential()

function LoginService (userRepository) {
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
        console.log(`matching ${user.password} and ${storedHash}`)
        pw.verify(storedHash, user.password, function (err, isValid) {
          if (err) {
            console.log('error!!!!')
            return callback(err)
          }
          if (isValid) {
            callback(undefined, {
              token: 'fake-token',
              valid: true
            })
          } else {
            callback(undefined, { valid: false })
          }
        })
      })
    }
  }
}

module.exports = LoginService
