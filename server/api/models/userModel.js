'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  Password: {
    type: String
  }
});

module.exports = mongoose.model('Users', userSchema);