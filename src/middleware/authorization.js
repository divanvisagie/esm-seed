'use strict'
function exclude (method, url) {
  return {
    method,
    url
  }
}

function config (options) {
  const { whitelist } = options || {}

  function isWhitelistedRoute (req) {
    return (whitelist || []).filter(x => {
      return req.url.match(x.url)
    }).find(x => x.method.toLowerCase() === req.method.toLowerCase())
  }

  return (req, res, next) => {
    if (isWhitelistedRoute(req)) {
      return next()
    }
    if (req.headers && req.headers['x-access-token']) {
      return next()
    }
    res.status(401)
  }
}

module.exports = {
  config,
  exclude
}
