'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var gpu = (require('./models/gpu'))();
var config = require('../../config');

router.put('/gpu', (req, res) => {
    let promise = new gpu(req.body).save().then((doc) => {
        res.send({
            data: doc,
            status: 200
        });
    }, (err) => {
        res.send({
            err: err,
            status: 500
        });
    });
});

router.get('/gpus', (req, res) => {
    gpu.find().then((doc) => {
        res.send({
            status: 200,
            data: doc
        })
    });

});

router.get('/gpu/:id', (req, res) => {
    let id = req.params.id;

    gpu.findOne({
        "_id": mongoose.Types.ObjectId(id)
    }).then((doc) => {
        res.send(doc);
    });
});

module.exports = router;
