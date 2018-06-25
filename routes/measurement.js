const express = require('express');
const router = express.Router();
const Measurement = require('../models/Measurement');

router.get('/', function(req, res, next) {
    Measurement
        .find()
        .populate('point')
        .exec(function (err, measurements) {
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
    Measurement.create(req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

router.put('/:id', function(req, res, next) {
    Measurement.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
        if (err) return next(err);
        console.log(post)
        res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {
    Measurement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
