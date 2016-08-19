/* global describe, it */
'use strict'
const authorization = require('../../src/middleware/authorization')
const { exclude } = authorization
const chai = require('chai')
const spies = require('chai-spies')
chai.use(spies)
chai.should()

describe('authorization middleware constructor', () => {
  describe(`get /api/ping without x-access-token`, () => {
    function nextMock () {}

    it(`should return 401`, done => {
      const mockRequest = {
        url: '/api/ping'
      }

      const responseMock = {
        status (statusCode) {
          statusCode.should.equal(401)
          done()
        }
      }
      authorization.config()(mockRequest, responseMock, nextMock)
    })
  })

  describe(`get /api/ping with x-access-token`, () => {
    it(`should call next()`, done => {
      const mockRequest = {
        url: '/api/ping',
        headers: {
          'x-access-token': 'mock.jwt.token'
        }
      }
      const responseMock = {
        status (statusCode) {
          throw Error('should not be called in this case')
        }
      }
      const mockTokenService = {
        payloadForToken (token, callback) {
          return callback(null, {})
        }
      }
      authorization.config(mockTokenService)(mockRequest, responseMock, () => {
        done()
      })
    })
  })

  describe(`get /api/user/login without x-access-token with route excluded`, () => {
    it(`should call next()`, done => {
      const mockRequest = {
        url: '/api/user/login',
        method: 'GET',
        headers: {}
      }
      const responseMock = {
        status (statusCode) {
          throw Error('should not be called in this case')
        }
      }
      const mockTokenService = {
        payloadForToken (token, callback) {
          return callback(undefined, {})
        }
      }
      authorization.config(mockTokenService, {
        whitelist: [
          exclude('GET', '/api/user/login')
        ]
      })(mockRequest, responseMock, () => {
        done()
      })
    })
  })
})
