var mongoose = require('mongoose');

module.exports = function (name) {
	var schema = new mongoose.Schema({
		device: String,
		driver: String,
		version_api: String,
		vendor: String,
		os: String,
		os_version: String,
		platform_architecture: String
	});
	return mongoose.model(name, schema);
};