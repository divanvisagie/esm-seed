/* global describe, it, beforeEach */
'use strict'
require('chai').should()
const container = require('../../src/container')

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
    testInstance.should.not.equal(undefined)
  })

  describe(`when adding the same instance twice`, () => {
    it(`should throw Error`, () => {
      (() => {
        container.add(Test)
        container.add(Test)
      }).should.Throw(Error)
    })
  })

  describe(`given no dependencies for DependantOnTest`, () => {
    it(`should throw exception`, () => {
      (() => {
        container.add(DependantOnTest)
        container.resolve(DependantOnTest)
      }).should.Throw(Error)
    })
  })

  describe('given custom builder for test', () => {
    it(`should be able to resolve instance`, () => {
      container.add(Test, () => {
        return {
          test () {
            console.log('test')
          }
        }
      })
      let testInstance = container.resolve(Test)
      testInstance.should.not.equal(undefined)
    })
  })
})
