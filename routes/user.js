const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.send(`You got the login page!\n`)
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(info) { return res.send(info.message) }
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, (err) => {
            if (err) { return next(err); }
            return res.send(user);
        })
    })(req, res, next);
})

module.exports = router;
