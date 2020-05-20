module.exports = function (app) {
    var user = require("../controllers/userController");

    //User Routes
    app.route("/register").post(user.createUser);

    app.route("/login").post(user.userLogin);

    app.route("/logout").get(user.userLogout);

    app.route("/getUser").get(user.getUser);

};
