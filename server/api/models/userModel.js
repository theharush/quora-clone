'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  Username: {
    type: String
  },
  Password: {
    type: String
  },
  Name: {
    type: String
  }
});

module.exports = mongoose.model('Users', userSchema);