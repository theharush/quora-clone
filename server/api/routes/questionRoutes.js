"use strict";
module.exports = function (app) {
  var question = require("../controllers/questionController");


  //Question Routes
  app.route("/question").get(question.getQuestionData);

  app.route("/question/:questionId").post(question.postAnswer);

};
