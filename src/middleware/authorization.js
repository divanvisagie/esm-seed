'use strict'
const winston = require('winston')

function exclude (method, url) {
  return {
    method,
    url
  }
}

function config (tokenService, options) {
  const { whitelist } = options || {}

  function isWhitelistedRoute (req) {
    return (whitelist || []).filter(x => req.url.match(x.url))
      .find(x => x.method.toLowerCase() === req.method.toLowerCase())
  }

  function authFailure (res) {
    winston.log('info', 'authorization failure')
    res.status(401).send('invalid token')
  }

  return (req, res, next) => {
    if (isWhitelistedRoute(req)) {
      return next()
    }
    if (req.headers && req.headers['x-access-token']) {
      tokenService.payloadForToken(req.headers['x-access-token'], (err, data) => {
        if (err) {
          return authFailure(res)
        }
        if (data) {
          req.user = data
          return next()
        }
        return authFailure(res)
      })
    } else {
      authFailure(res)
    }
  }
}

module.exports = {
  config,
  exclude
}
