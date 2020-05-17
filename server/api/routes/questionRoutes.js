module.exports = function (app) {
  const question = require("../controllers/questionController"),
    user = require("../controllers/userController");



  //Question Routes
  app.get("/api/question", user.checkAuth, question.getQuestion);

  app.get("/api/questions", user.checkAuth, question.getQuestions);

  app.get("/api/question/:questionId", user.checkAuth, question.getQuestion);
  app.post("/api/question/:questionId", user.checkAuth, question.postAnswer)


};
