function UserRepository (mongoose) {
  let User = mongoose.model('User', User)

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
    }
  }
}

module.exports = UserRepository
