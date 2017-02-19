'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var vulkaninfos = (require('./models/vulkaninfos'))();
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
    res.sendFile(__dirname + '/models/vulkaninfos/index.js');
});

server.put('/vulkaninfo', function (req, res) {
    let promise = new vulkaninfos(req.body).save().then(function (doc) {
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

server.get('/vulkaninfos', function (req, res) {
    vulkaninfos.find().then(function (doc) {
        res.send({
            status: 200,
            data: doc
        })
    });
});

server.get('/vulkaninfo/:id', function (req, res) {
    let id = req.params.id;

    vulkaninfos.findOne({
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
