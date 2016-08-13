/* global describe, it, beforeEach, afterEach */

'use strict'

const express = require('express')
const supertest = require('supertest')
const enrouten = require('express-enrouten')
const UserRepository = require('../../src/repositories/user-repository')
const container = require('../../src/container')

const mockRepository = {
  createUser (user, callback) {
    callback(null, 'mock')
  }
}

describe(`ping`, () => {
  let app, api, mock
  const url = 'http://localhost:1337'

  beforeEach(done => {
    app = express()
    app.on('start', done)
    container.add(UserRepository, () => mockRepository)
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

  describe(`given a get to /api/user/register`, () => {
    it(`should return success message`, done => {
      api.post('/api/user/register')
        .send({
          username: 'bob',
          email: 'bob@burgers.com',
          password: 'm@gn3t5'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.should.deep.equal({
            message: 'user registered'
          })
          done()
        })
    })
  })
})
