module.exports = function (app) {
  var question = require("../controllers/questionController");


  //Question Routes
  app.route("/api/question").get(question.getQuestion);

  app.route("/api/questions").get(question.getQuestions);

  app.route("/api/question/:questionId").get(question.getQuestion).post(question.postAnswer)


};
