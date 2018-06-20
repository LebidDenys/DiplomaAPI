const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.send(`You got the login page!\n`)
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(info) {return res.send(info.message)}
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/authrequired');
        })
        console.log(user, req.isAuthenticated())
    })(req, res, next);
});

router.post('/signup', (req, res) => {
    if (req.body.email &&
        req.body.password) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/authrequired');
            }
        });
    }
});




module.exports = router;
