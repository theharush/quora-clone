module.exports = function (app) {
  var question = require("../controllers/questionController");


  //Question Routes
  app.route("/api/question").get(question.getQuestionData);

  app.route("/api/question/:questionId").post(question.postAnswer);

};
