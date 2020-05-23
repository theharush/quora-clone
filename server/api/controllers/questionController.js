"use strict";
var mongoose = require("mongoose"),
  Question = mongoose.model("Questions");

//controller for fetching last 10 questions from DB
exports.getQuestions = function(req, res) {
  Question.find()
    .sort({ created_date: -1 })
    .limit(10)
    .exec(function(err, questions) {
      if (err) res.send(err);
      res.json(questions);
    });
};

//controller for fetching last 10 questions after a given date from DB
exports.getMoreQuestions = function(req, res) {
  Question.find({ created_date: { $lt: req.params.LastQuestionDate } })
    .sort({ created_date: -1 })
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
    else res.json(question);
  });
};

//controller for posting a new question.
exports.postQuestion = function(req, res) {
  var question = new Question(req.body);
  question.save(function(err, question) {
    if (err) {
      res.send(err);
    } else res.send(question);
  });
};

//controller for posting an answer on a question
exports.postAnswer = function(req, res) {
  Question.findById(req.params.questionId, function(err, question) {
    if (err) res.send(err);
    var answer = { answer: req.body.answer, name: req.user.name };
    question.answers.push(answer);
    question.save(function(err, updatedQuestion) {
      if (err) res.send(err);
      res.send(question);
    });
  });
};
