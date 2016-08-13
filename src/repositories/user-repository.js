function UserRepository (mongooseConfig) {
  let mongoose = mongooseConfig.get()
  let User = mongoose.model('User', {
    username: String,
    password: String
  })

  return {
    createUser (user, callback) {
      let newUser = new User(user)
      newUser.save(err => {
        if (err) {
          console.log(err)
          callback(err, undefined)
        } else {
          callback(undefined, 'success')
        }
      })
    },

    findUserByUsername (username, callback) {
      User.find({ username: username }, (err, data) => {
        if (err) {
          console.log(err)
          callback(err, undefined)
        } else {
          console.log(data)
          callback(undefined, data)
        }
      })
    }
  }
}

module.exports = UserRepository
