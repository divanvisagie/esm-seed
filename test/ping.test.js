'use strict'
const PingService = require('../src/ping-service')
require('chai').should()

describe('Ping service', () => {
  describe(`custom('pong')`, () => {
    it(`should return 'ping: pong'`, () => {
      const message = PingService().custom('pong')
      message.should.equal('Ping: pong')
    })
  })
})
