'use strict';
const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;


var userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  name: {
    type: String
  }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users', userSchema, 'Users');