const winston = require('winston')

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
          winston.log('createUser:', err)
          callback(err, undefined)
        } else {
          callback(undefined, 'success')
        }
      })
    },

    findUserByUsername (username, callback) {
      User.find({ username: username }, (err, data) => {
        if (err) {
          winston.log('findUserByUsername:', err)
          callback(err, undefined)
        } else {
          callback(undefined, data)
        }
      })
    }
  }
}

module.exports = UserRepository
