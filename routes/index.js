/* General Necessities */
var express = require('express');
var router = express.Router();
var Type = require('type-of-is');

/*

function MakeSurveyReadable(survey){
	// the variables
	var windspeeds = ["0 - 1 knots","2 - 3 knots","4 - 6 knots","7 - 10 knots",
					"11 - 16 knots","17 - 21 knots","22 - 27 knots","28+ knots"];
	var cloudCovers = ["0%","25%","50%","75%","100%"];

	var materials = ["plastic", "foam", "glass", "metal", "wood", "other"];
	var categories = {0: ["fragment","buoy/float","rope/line","net","bottle","jug/bucket", "crate", "other"],
					1: ["fragment", "buoy/float", "cup", "flip-flop", "crate", "other"],
					2: ["buoy", "bottle","light bulb","other"],
					3: ["drum", "spray can", "other"],
					4: ["log","crate", "lumber", "other"],
					5: ["other"]
				};

	var dimensions = ["0 - 10 cm", "10 - 100 cm", "1 - 10 meter", "10+ meter"];
	var distances = ["0 - 10 meter","10 - 50 meter","50 - 100 meter","100+ meter"];

	// replace them in the events
	for (var i=0; i < survey.events.length; i++){
		if (survey.events[i].type == "sighting" ){
			var mat = survey.events[i].material;
			var cat = survey.events[i].category;
			if (!(mat == 5 && cat > 0) ) {
				survey.events[i].category = categories[mat][cat];
			} else {
				survey.events[i].category = "other";
			}

			//categories[survey.events[i].material].survey.events[i].category
			survey.events[i].material = materials[mat]

			survey.events[i].dimension = dimensions[survey.events[i].dimension]
			survey.events[i].distance = distances[survey.events[i].distance]
		};

		if (survey.events[i].type == "startSurvey"){
			survey.events[i].windspeed = windspeeds[survey.events[i].windspeed];
			survey.events[i].cloudCover = cloudCovers[survey.events[i].cloudCover];
		};
	};
	return survey;
};

*/

/* Here we go! Catch put request and store it. */
router.put('/', function(req, res) {
	var db = req.db;
	var collection = db.get('surveys');

	console.log("--------\nJust received this req.body as type:", Type.string(req.body));
	console.log(req.body);
	var jsonfile = req.body;

	// to accept text:
	var jsonfile = JSON.parse(jsonfile);

	// to turn it into readable stuff: 
	// var jsonfile = MakeSurveyReadable(jsonfile);

	console.log("\nAnd we're gonna save it like this:");
	console.log(jsonfile);

	collection.insert(jsonfile, function (err, doc) {
		if(err) {
			res.send({"received":false,"message":"Stuff went wrong. Sorry! Try again?"});
		}else{
			res.send({"received":true,"message":"We received your survey. Thanks!"});
		};
	});
});

module.exports = router;