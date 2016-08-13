/* global describe, it */
'use strict'
const PingService = require('../../src/services/ping-service')
require('chai').should()
const container = require('../../src/container')

function Test() {
  return {
    test () {
      console.log('test')
    }
  }
}

function DependantOnTest(test) {
  return {}
}

describe('app container', () => {
  beforeEach(() => {
    container.destroy()
  })

  it(`should be able to resolve instance Test if Test is added`, () => {
    container.add(Test)
    let testInstance = container.resolve(Test)
    testInstance.should.not.equal(undefined)
  })

  it(`should be able to resolve DependantOnTest() if Test is added furst`, () => {
    container.add(Test)
    container.add(DependantOnTest)
    let testInstance = container.resolve(DependantOnTest)
    testInstance.should.not.equal(undefined)
  })
})
