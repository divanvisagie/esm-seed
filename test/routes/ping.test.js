/* global describe, it, beforeEach, afterEach */

'use strict'

const express = require('express')
const supertest = require('supertest')
const pingRoute = require('../../src/routes/ping')
const pingService = require('../../src/services/ping-service')()

describe(`ping`, () => {
  let app, api, mock
  const url = 'http://localhost:1337'

  beforeEach(done => {
    app = express()
    app.on('start', done)
    mock = app.listen('1337')

    pingRoute(app, {
      pingService
    })

    api = supertest(url)
    done()
  })

  afterEach(done => {
    mock.close()
    done()
  })

  describe(`given a get to /api/ping`, () => {
    it(`should return pong`, done => {
      api.get('/api/ping')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            throw err
          }
          res.body.should.deep.equal({
            ping: 'pong'
          })
          done()
        })
    })
  })
})
