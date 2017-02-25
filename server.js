'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var server = express();

var db = mongoose.connect(config.mongodb_uri, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Is connected to the db");
});

server.use(express.static(__dirname));
server.use(bodyparser.json());

server.set('view engine', 'ejs');

var api = require('./api');

server.get('/', function (req, res) {
    res.sendFile('./index.html');
});

server.use('/api/:version', api);

server.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.server.port);
    }
});
