/* global describe, it, beforeEach */
'use strict'
const createTokenConfig = require('../../src/config/token-config')
const TokenService = require('../../src/services/token-service')
require('chai').should()

describe('Token service', () => {
  const tokenConfig = createTokenConfig()
  let tokenService

  beforeEach(done => {
    tokenService = TokenService(tokenConfig)
    done()
  })

  const user = {
    username: 'bob'
  }
  describe('tokenService', () => {
    it('should initialize', () => {
      let tokenService = TokenService(tokenConfig)
      tokenService.should.not.equal(undefined)
    })
  })
  describe(`generateTokenForUser()`, () => {
    it(`should return token that isn't blank`, () => {
      const token = tokenService.generateTokenForUser(user)
      token.length.should.be.above(5)
    })

    it(`should return a jwt token with 3 segments`, () => {
      const token = tokenService.generateTokenForUser(user)
      const splitList = token.split('.')
      splitList.length.should.equal(3)
    })
  })

  describe('given token for bob', () => {
    it('should deserialize to { bob }', done => {
      const tokenService = TokenService(tokenConfig)
      const user = {
        username: 'bob'
      }
      const token = tokenService.generateTokenForUser(user)
      tokenService.payloadForToken(token, (err, data) => {
        if (err) {
          throw err
        }
        data.username.should.equal('bob')
        done()
      })
    })
  })
})
