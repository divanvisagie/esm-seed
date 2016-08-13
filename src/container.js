'use strict'

const upperCamelCase = require('uppercamelcase')

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames (func) {
  let fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) {
    result = []
  }
  return result
}

function Container () {
  let container = {}

  function getInstances (parameters) {
    return parameters.map(paramName => {
      const key = upperCamelCase(paramName)
      let instance = container[key]
      if (!instance) {
        const containerString = JSON.stringify(container)
        throw new Error(`could not find an instance of
          ${key} in ${containerString}`)
      }
      return instance
    })
  }

  return {
    resolve (classType) {
      return container[classType.name]
    },

    add (classType, builder) {
      if (container[classType.name]) {
        throw new Error(`already created instance of ${classType.name}`)
      }

      if (builder) {
        container[classType.name] = builder()
      } else {
        const parameterNames = getParamNames(classType)
        const instances = getInstances(parameterNames)

        container[classType.name] = classType.apply(this, instances)
      }
    },

    destroy () {
      container = {}
    }
  }
}

module.exports = Container()
