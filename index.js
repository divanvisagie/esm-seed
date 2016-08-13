'use strict'

const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path')
const container = require('./src/container').container
const UserRepository = require('./src/repositories/user-repository')

const mockRepository = {
  createUser (user, callback) {
    callback(null, 'mock')
  }
}

let app = express()

container.add(UserRepository, () => mockRepository)

app.use(express.static(path.join(__dirname, 'public')))

app.use(enrouten({
  directory: 'src/routes'
}))

app.listen(8080)
