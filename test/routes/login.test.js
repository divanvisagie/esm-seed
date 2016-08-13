/* global describe, it, beforeEach, afterEach */

'use strict'

const express = require('express')
const supertest = require('supertest')
const enrouten = require('express-enrouten')
const LoginService = require('../../src/services/login-service')
const container = require('../../src/container')

const mockLoginService = {
  login (user, callback) {
    callback(null, {
      token: 'my-fake-token'
    })
  }
}

describe(`login`, () => {
  let app, api, mock
  const url = 'http://localhost:1337'

  beforeEach(done => {
    app = express()
    app.on('start', done)
    container.add(LoginService, () => mockLoginService)
    app.use(enrouten({
      directory: '../../src/routes'
    }))
    mock = app.listen('1337')

    api = supertest(url)
    done()
  })

  afterEach(done => {
    container.destroy()
    mock.close()
    done()
  })

  describe(`given a get to /api/user/login`, () => {
    it(`should return token`, done => {
      api.post('/api/user/login')
        .send({
          username: 'bob',
          password: 'm@gn3t5'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.should.have.property('token')
          done()
        })
    })
  })
})
