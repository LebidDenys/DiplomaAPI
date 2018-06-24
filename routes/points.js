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
    // if (req.isAuthenticated()){
    //     Points.create(req.body, function (err, post) {
    //         if (err) return next(err);
    //         res.json(post);
    //     });
    // } else {
    //     res.send('You have not permission');
    // }
});

router.put('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        Point.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
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
        Point.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        res.send('You have not permission');
    }
});

module.exports = router;
