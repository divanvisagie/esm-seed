const mongoose = require('mongoose')

function MongooseConfig () {

  mongoose.connect('mongodb://localhost/test')
  return {
    get () {
      return mongoose
    }
  }
}
module.exports = MongooseConfig
