module.exports = function (app) {
    var user = require("../controllers/userController");

    //User Routes
    app.route("/api/register").post(user.createUser);

    app.route("/api/login").post(user.userLogin);

    app.route("/api/logout").get(user.userLogout);

    app.route("/api/getUser").get(user.getUser);

};
