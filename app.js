'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var vulkaninfosmodel = (require('./models/vulkaninfos'))();
var server = express();
var config = require('./config');

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

server.put('/benchmark', function (req, res) {
    let promise = new vulkaninfosmodel(req.body).save().then(function (doc) {
        if (!doc) {
            res.sendStatus(400);
            return;
        }
        res.send({
            code: 200,
            data: doc
        });
    });
});

server.get('/benchmark', function (req, res) {});

server.listen(process.env.PORT || config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.server.port);
    }
});
