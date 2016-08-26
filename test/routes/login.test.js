/* global describe, it, beforeEach, afterEach */

'use strict'

const express = require('express')
const supertest = require('supertest')
const userRoute = require('../../src/routes/user')

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

    userRoute(app, {
      loginService: mockLoginService
    })
    mock = app.listen('1337')

    api = supertest(url)
    done()
  })

  afterEach(done => {
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
