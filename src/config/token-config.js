'use strict'
function createTokenConfig () {
  return {
    expiry: '2 days',
    secret: 'my-secret'
  }
}
module.exports = createTokenConfig
