const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20
  },
  profilePicture: {
    type: String,
    default:""
  },
  coverPicture: {
    type: String,
    default:""
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    default: "",
    max: 50,
  },
  city: {
    type: String,
    default: "",
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [0, 1, 2],
  }
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);