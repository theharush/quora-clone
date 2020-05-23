module.exports = function(app) {
  const question = require("../controllers/questionController"),
    user = require("../controllers/userController");

  //Question Routes
  app.get("/api/questions", question.getQuestions);
  app.get("/api/questions/:LastQuestionDate", question.getMoreQuestions);

  app.get("/api/question", question.getQuestion);

  app.post("/api/postQuestion", user.checkAuth, question.postQuestion);

  app.get("/api/question/:questionId", question.getQuestion);
  app.post("/api/question/:questionId", user.checkAuth, question.postAnswer);
};
