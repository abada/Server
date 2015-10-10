// Modules
var express = require('express');
var router = module.exports = express.Router();

router.get('/surveys', function(req, res) {
    res.send({surveys: true});
});

router.get('/surveys/:surveyId', function(req, res) {
    res.send({surveys: true});
});
