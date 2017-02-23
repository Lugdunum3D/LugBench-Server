'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gpu = (require('./models/gpu'))();
var config = require('../../config');

var db = mongoose.connect(config.db.uri_mongodb, function (err) {
    if (err) {
        console.log(err);
    }
});

router.put('/gpu', function (req, res) {
    let promise = new gpu(req.body).save().then(function (doc) {
        if (!doc) {
            res.sendStatus(400);
            return;
        }
        res.send({
            status: 200,
            data: doc
        });
    });
});

router.get('/gpus', function (req, res) {
    gpu.find().then(function (doc) {
        res.send({
            status: 200,
            data: doc
        })
        //res.render('pages/gpus', {
        //  gpus: doc
        //});
    });

});

router.get('/gpu/:id', function (req, res) {
    let id = req.params.id;

    gpu.findOne({
        "_id": mongoose.Types.ObjectId(id)
    }).then(function (doc) {
        res.send(doc);
    });
});

module.exports = router;
