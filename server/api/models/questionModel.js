"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
    default: "General"
  },
  answers: [
    {
      name: { type: String },
      answer: { type: String },
      created_date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Questions", QuestionSchema);
