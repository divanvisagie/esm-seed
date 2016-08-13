function RegistrationService (userRepository) {
  return {
    registerUser (user) {
      userRepository.createUser(user)
    }
  }
}

module.exports = RegistrationService
