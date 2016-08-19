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
        expiresIn: expiry // expires in 24 hours
      })
    },
    payloadForToken (token) {
      return undefined
    }
  }
}

module.exports = TokenService
