const mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('Users');

//middleware for authenticating requests.
exports.checkAuth = function (req, res, next) {
    if (req.user) {
        console.log(req.user);

        next();
    }

    else
        res.sendStatus(403);
}

exports.userLogin = function (req, res, next) {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login.html?info=' + info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });

        })(req, res, next);
}

exports.userLogout = function (req, res) {
    req.logout();
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
