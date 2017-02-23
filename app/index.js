var express = require('express');
var app = express.Router();
var mongoose = require('mongoose');
var gpu = (require('../api/v1/models/gpu'))();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	gpu.find().then((gpus) => {
		res.render('pages/index', {gpus:gpus});
    }, (err) => {
    });
});

app.get('/gpu/:id', (req, res) => {
	gpu.find({_id: mongoose.Types.ObjectId(req.params.id)}).then((gpu) => {
		res.json(gpu);
	},(err) => {

	});
});

module.exports = app;
