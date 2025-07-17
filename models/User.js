const mongoose = require('mongoose')
const SubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
})
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  subjects: [SubjectSchema],
})
const User = mongoose.model('User', UserSchema)
module.exports = User
