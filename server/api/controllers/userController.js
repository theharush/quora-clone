"use strict";
var mongoose = require('mongoose'),
    User = mongoose.model('Users');


//controller for fetching a random question from DB
exports.userLogin = function (req, res) {
    User.findOne({ Username: req.body.Username }, function (err, user) {
        if (err)
            res.send(err);
        if (user && user.Password == req.body.Password) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.sendStatus('403');
        }

    });
}

exports.userLogout = function (req, res) {
    req.session = null;
    res.redirect('/login.html');
}

exports.createUser = function (req, res) {
    User.findOne({ Username: req.body.Username }, function (err, user) {
        if (err)
            res.send(err);
        if (user)
            res.sendStatus(403);
        else {

            var newUser = new User(req.body);
            newUser.save(function (err, user) {
                if (err)
                    res.send(err)
                req.session.user = user;
                res.redirect('/');
            })
        }
    })
}
