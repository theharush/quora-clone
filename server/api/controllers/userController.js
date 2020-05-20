const mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('Users');

//middleware for authenticating requests.
exports.checkAuth = function (req, res, next) {
    if (req.user) {
        next();
    }
    else {
        console.log("unauthorized request has been made");
        res.send(403, "unauthorized");
    }
}

exports.userLogin = function (req, res, next) {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send(403, info);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send(user);
            });

        })(req, res, next);
}

exports.userLogout = function (req, res) {
    req.logout();
    res.send(200);
}

exports.getUser = function (req, res) {
    res.send(req.user);
}

exports.createUser = function (req, res) {
    User.register(new User({ username: req.body.username, name: req.body.name }),
        req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.redirect('/register.html');
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
}
