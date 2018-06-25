const express = require('express');
const router = express.Router();
const Point = require('../models/Points');

router.get('/', function(req, res, next) {
    Point.find(function (err, points) {
        if (err) return next(err);
        res.json(points);
    });
});

router.get('/:id', function(req, res, next) {
    Point.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.post('/', function(req, res, next) {
    Point.create(req.body, function (err, post) {
        if (err) {
            console.log(err)
            return next(err);
        }
        res.json(post);
    });
});

router.put('/:id', function(req, res, next) {
    Point.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
        if (err) return next(err);
        console.log(post)
        res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {
    Point.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
