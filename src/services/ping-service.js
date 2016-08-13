'use strict'

function PingService () {
  return {
    get () {
      return {
        ping: 'pong'
      }
    }
  }
}

module.exports = PingService
