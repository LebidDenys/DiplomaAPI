const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');

router.get('/', function(req, res, next) {
    Measurement.find(function (err, measurements) {
        if (err) return next(err);
        res.json(measurements);
    });
});

router.get('/:id', function(req, res, next) {
    Measurement.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function(req, res, next) {
    if (req.isAuthenticated()){
        Measurement.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        res.send('You have not permission');
    }
});

router.put('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Measurement.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
            if (err) return next(err);
            console.log(post)
            res.json(post);
        });
    } else {
        res.send('You have not permission');
    }
});

router.delete('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Measurement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        res.send('You have not permission');
    }
});

module.exports = router;
