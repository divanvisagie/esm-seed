/* global describe, it */
'use strict'
const PingService = require('../../src/services/ping-service')
require('chai').should()

describe('Ping service', () => {
  describe(`custom('pong')`, () => {
    it(`should return { ping: "pong" }`, () => {
      const message = PingService().get()
      message.should.deep.equal({ping: 'pong'})
    })
  })
})
