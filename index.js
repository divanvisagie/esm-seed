'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const enrouten = require('express-enrouten')
const path = require('path')

const MongooseConfig = require('./src/mongoose-config')
const container = require('./src/container')
const UserRepository = require('./src/repositories/user-repository')
const RegistrationService = require('./src/services/registration-service')
const LoginService = require('./src/services/login-service')

container.add(MongooseConfig)
container.add(UserRepository)
container.add(RegistrationService)
container.add(LoginService)

let app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(enrouten({
  directory: 'src/routes'
}))

app.listen(8080)
