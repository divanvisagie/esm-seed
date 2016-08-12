'use strict'

const express = require('express')
const enrouten = require('express-enrouten')

let app = express()

app.use(enrouten({
  directory: 'routes'
}))

app.listen(8080)
