/* global describe, it, beforeEach */
'use strict'
require('chai').should()
const { container, DependenciesNotFoundException } = require('../../src/container')

function Test () {
  return {
    test () {
      console.log('test')
    }
  }
}

function DependantOnTest (test) {
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

  it(`should be able to resolve DependantOnTest() if Test is added first`, () => {
    container.add(Test)
    container.add(DependantOnTest)
    let testInstance = container.resolve(DependantOnTest)
    console.log(testInstance)
    testInstance.should.not.equal(undefined)
  })

  describe(`given no dependencies for DependantOnTest`, () => {
    it(`should throw exception`, () => {

      //let testInstance =
      (function () {
        container.add(DependantOnTest)
        container.resolve(DependantOnTest)
      }).should.Throw(DependenciesNotFoundException)
    })
  })
})
