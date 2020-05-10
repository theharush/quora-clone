"use strict";
var mongoose = require('mongoose'),
  Question = mongoose.model('Questions');



exports.getQuestionData = function(req, res) {
  Question.findOne(function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};