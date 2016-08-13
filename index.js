'use strict'

const express = require('express')
const enrouten = require('express-enrouten')
const path = require('path')

let app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(enrouten({
  directory: 'src/routes'
}))

app.listen(8080)
