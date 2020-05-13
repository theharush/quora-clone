'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  Name: {
    type: String
  },
  Key: {
    type: String
  }
});

module.exports = mongoose.model('Users', userSchema);