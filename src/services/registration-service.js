function RegistrationService (userRepository) {
  return {
    registerUser (user, callback) {
      userRepository.createUser(user, callback)
    }
  }
}

module.exports = RegistrationService
