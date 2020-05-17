module.exports = function (app) {
  const question = require("../controllers/questionController"),
    user = require("../controllers/userController");



  //Question Routes
  app.route("/api/question").get(user.checkAuth, question.getQuestion);

  app.route("/api/questions").get(user.checkAuth, question.getQuestions);

  app.route("/api/question/:questionId").get(user.checkAuth, question.getQuestion).post(user.checkAuth, question.postAnswer)


};
