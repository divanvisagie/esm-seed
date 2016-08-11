'use strict'

function PingService () {
  return {
    custom (message) {
      return `Ping: ${message}`
    }
  }
}

module.exports = PingService
