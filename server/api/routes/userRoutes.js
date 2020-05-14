module.exports = function (app) {
    var user = require("../controllers/userController");

    //Question Routes
    app.route("/login").post(user.userLogin);

};
