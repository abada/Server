/* General Necessities */
var express = require('express');
var router = module.exports = express.Router();
var Type = require('type-of-is');

/* Here we go! Catch put request and store it. */
router.put('/', function(req, res) {
	var db = req.db;
	var collection = db.get('surveys');

	console.log("--------\nJust received this req.body as type:", Type.string(req.body));
	console.log(req.body);
	var jsonfile = req.body;

	// to accept text:
	jsonfile = JSON.parse(jsonfile);

	// to turn it into readable stuff:
	// var jsonfile = MakeSurveyReadable(jsonfile);

	console.log("\nAnd we're gonna save it like this:");
	console.log(jsonfile);

	collection.insert(jsonfile, function (err, doc) {
		if (err) {
			res.send({"received":false,"message":"Stuff went wrong. Sorry! Try again?"});
		} else {
			res.send({"received":true,"message":"We received your survey. Thanks!"});
		}
	});
});

