'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var QuestionSchema = new Schema({
  Question: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  Answers: [{
    Name: { type: String },
    Answer: { type: String },
    Created_date: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Questions', QuestionSchema);