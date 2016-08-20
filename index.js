'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const enrouten = require('express-enrouten')
const path = require('path')
const expressWinston = require('express-winston')
const winston = require('winston')

const authorization = require('./src/middleware/authorization')
const { exclude } = authorization

const MongooseConfig = require('./src/config/mongoose-config')
const TokenConfig = require('./src/config/token-config')
const container = require('./src/container')
const UserRepository = require('./src/repositories/user-repository')

const RegistrationService = require('./src/services/registration-service')
const LoginService = require('./src/services/login-service')
const TokenService = require('./src/services/token-service')

container.add(MongooseConfig)
container.add(TokenConfig)

container.add(UserRepository)

container.add(TokenService)
container.add(RegistrationService)
container.add(LoginService)

let app = express()

app.use(bodyParser.json())
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}  {{res.statusCode}} {{res.responseTime}}ms',
  colorize: false
}))

app.use(authorization.config(container.resolve(TokenService), {
  whitelist: [
    exclude('POST', '/api/user/login'),
    exclude('POST', '/api/user/register')
  ]
}))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(enrouten({
  directory: 'src/routes'
}))

app.listen(8080)
