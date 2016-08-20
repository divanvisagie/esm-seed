'use strict'
const jwt = require('jsonwebtoken')

function TokenService (tokenConfig) {
  const secret = tokenConfig.secret
  const expiry = tokenConfig.expiry
  return {
    generateTokenForUser (user) {
      const cleanUser = {
        username: user.username
      }
      return jwt.sign(cleanUser, secret, {
        expiresIn: expiry
      })
    },
    payloadForToken (token, callback) {
      jwt.verify(token, secret, (err, decoded) => {
        console.log(decoded) // bar
        return callback(err, decoded)
      })
    }
  }
}

module.exports = TokenService
