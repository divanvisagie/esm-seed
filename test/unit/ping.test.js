/* global describe, it */
'use strict'
const PingService = require('../../src/ping-service')
require('chai').should()

describe('Ping service', () => {
  describe(`custom('pong')`, () => {
    it(`should return 'Ping: pong'`, () => {
      const message = PingService().custom('pong')
      message.should.equal('Ping: pong')
    })
  })
})
