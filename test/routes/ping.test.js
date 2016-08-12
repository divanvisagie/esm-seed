/* global describe, it, beforeEach, afterEach */

'use strict'

const express = require('express')
const request = require('supertest')

describe(`ping`, () => {
  let app, mock

  beforeEach(done => {
    app = express()
    app.on('start', done)
    mock = app.listen(1337)
  })

  afterEach(done => {
    mock.close(done)
  })

  it(`should return pong`, done => {
    request(mock)
      .get('ping')
      .expect(200)
      .expect(/pong/)
      .end((err, res) => {
        done(err)
      })
  })
})
