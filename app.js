'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var Gpu = (require('./models/Gpu'))();
var config = require('./config');

var server = express();

var db = mongoose.connect(config.db.uri_dev, function (err) {
    if (err) {
        console.log(err);
    }
});

server.use(express.static(__dirname));
server.use(bodyparser.json());

server.get('/', function (req, res) {
    res.sendFile('./index.html');
});

server.get('/bodytosend', function (_, res) {
    res.sendFile(__dirname + '/models/Gpu/index.js');
});

server.put('/gpu', function (req, res) {
    let promise = new Gpu(req.body).save().then(function (doc) {
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

server.get('/gpus', function (req, res) {
    Gpu.find().then(function (gpus) {
        res.send({
            status: 200,
            gpus: gpus
        })
    });
});

server.get('/gpu/:id', function (req, res) {
    let id = req.params.id;

    Gpu.findOne({
        "_id": mongoose.Types.ObjectId(id)
    }).then(function (doc) {
        res.send(doc);
    });
});

server.listen(process.env.PORT || config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.server.port);
    }
});
