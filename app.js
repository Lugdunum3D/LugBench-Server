var express = require('express');
var server = express();

var config = require('./config');

server.use(express.static(__dirname));

server.get('/', function(req, res) {
	res.sendFile('./index.html');
});

server.put('/benchmark', function(req, res) {
	console.log(req);
	res.sendStatus(200);
});

server.listen(process.env.PORT || config.server.port, (err) => {
	if(err) {
		console.err(err);
	} else {
		console.log("Listening on port " + config.server.port);
	}
});