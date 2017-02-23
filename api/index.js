var express = require('express');
var router = express.Router();
var version;

module.exports = function (req, res, next) {
    try {
        version = require(`./${req.params.version}`);
        version(req, res, next);
        return;
    } catch (e) {
        if (e.code == "MODULE_NOT_FOUND") {
            res.sendFile(__dirname + '/notfound.html');
        } else {
            res.send(e.code);
        }
    }
};
