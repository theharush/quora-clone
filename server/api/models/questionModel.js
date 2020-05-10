'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuestionSchema = new Schema({
  question: {
    type: String  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Questions', QuestionSchema);