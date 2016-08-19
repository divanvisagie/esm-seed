'use strict'
const winston = require('winston')

function authorization (req, res, next) {
  winston.log('info', req.url)
  winston.log('info', req.headers)
  if (req.headers && req.headers['x-access-token']) {
    next()
  } else {
    res.status(401)
  }
}

module.exports = authorization
