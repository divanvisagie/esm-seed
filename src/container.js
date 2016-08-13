'use strict'
let container = {}

function AlreadyInitializedException (name) {
  return {
    message: `container already contains an instance of ${name}`,
    name: 'AlreadyInitializedException'
  }
}

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

function camelize (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/\s+/g, '')
}

module.exports = {
  resolve (classType) {
    return container[classType.name]
  },

  add (classType, builder) {
    if (container[classType.name]) {
      throw new AlreadyInitializedException(classType.name)
    }

    if (!builder) {
      const parameterNames = getParamNames(classType)
      const instances = parameterNames.map(paramName => {
        return container[camelize(paramName)]
      })
      console.log('instances', instances)
      container[classType.name] = classType.apply(this, instances)
      return
    }

    container[classType.name] = classType()
  },

  destroy () {
    container = {}
  }
}
