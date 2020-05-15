"use strict";
var mongoose = require("mongoose"),
  Question = mongoose.model("Questions");

//controller for fetching all questions from DB
exports.getQuestions = function(req, res) {
  Question.find()
    .limit(10)
    .exec(function(err, questions) {
      if (err) res.send(err);
      res.json(questions);
    });
};

//controller for fetching a random question from DB
exports.getQuestion = function(req, res) {
  Question.findById(req.params.questionId, function(err, question) {
    if (err) res.send(err);
    res.json(question);
  });
};

exports.postAnswer = function(req, res) {
  console.log(req.session);
  Question.findById(req.params.questionId, function(err, question) {
    if (err) res.send(err);
    var answer = { Answer: req.body.Answer, Name: req.session.user.Name };
    question.Answers.push(answer);
    question.save(function(err, updatedQuestion) {
      if (err) res.send(err);
      res.redirect("back");
    });
  });
};
