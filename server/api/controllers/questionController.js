"use strict";
var mongoose = require('mongoose'),
  Question = mongoose.model('Questions');

//controller for fetching a random question from DB
exports.getQuestionData = function(req, res) {
  Question.findOne(function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
}

exports.postAnswer = function(req,res){
  Question.findById(req.params.questionId, function(err,question){
    if(err)
      res.send(err);
    
    question.Answers.push(req.body);
    question.save(function(err, updatedQuestion) {
      if (err)
        res.send(err);
      res.json(updatedQuestion);
  });
  }) 
}
