"use strict";
var mongoose = require('mongoose'),
    User = mongoose.model('Users');



//controller for fetching a random question from DB
exports.authenticate = function (req, res, next) {
    console.log("i am a middleware");
    next();    // user = new User({ Password: "asd" });
    // user.save;



    // user = User.findOne({ Password: "asd" }, function (err, user) {
    //     if (err)
    //         res.send(err);
    //     return user;
    // });

    // if (user) {
    //     console.log("user")
    //     next();
    // }

    // res.send("Not a User")
}