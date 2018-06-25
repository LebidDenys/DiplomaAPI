const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.send(`You got the login page!\n`)
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(info) { return res.send(info.message) }
        if (err) {
            console.log(err);
            return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
            if (err) { console.log(err); return next(err); }
            return res.send(user);
        })
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.send();
});


router.post('/signup', (req, res, next) => {
    if(req.body.email && req.body.password) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };
        User.create(userData, function (err, user) {
            if (err) {
                console.log(err)
                return next(err)
            } else {
                return res.json(user);
            }
        });
    } else {
        res.send('You have not permission')
    }
});



module.exports = router;
