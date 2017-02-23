'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');
var server = express();

var db = mongoose.connect(config.db.uri_mongodb, (err) => {
    if (err) {
        console.log(err);
        return;
    }
	console.log("Is connected to the db");
});

server.use(express.static(__dirname));
server.use(bodyparser.json());

server.set('view engine', 'ejs');
server.set('views', __dirname + '/app/views');

var api = require('./api');
var app = require('./app');

server.get('/', function (req, res) {
    res.sendFile('./index.html');
});

server.use('/app', app);
server.use('/api/:version', api);

server.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.server.port);
    }
});
