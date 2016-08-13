function LoginService (userRepository) {
  return {
    login (user, callback) {
      if (!user.username) {
        return callback('username not found')
      }
      userRepository.findUserByUsername(user.username, callback)
      callback(null, { token: '' })
    }
  }
}

module.exports = LoginService
