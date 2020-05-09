"use strict";

exports.getQuestionData = function(req, res) {
  res.json({
    question: "how to code a webpage like quora",
    answers: [
      {
        name: "Eyal Harush",
        slogan: "Trying to code since 2020",
        answer: "you should try contacting Boaz "
      }
    ]
  });
};
