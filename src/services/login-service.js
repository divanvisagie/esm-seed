function LoginService (userRepository) {
  return {
    login (user, callback) {
      userRepository.findUserByUsername(user.username, callback)
    }
  }
}

module.exports = LoginService
