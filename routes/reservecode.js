/*
var http = require('http');
var querystring = require('querystring');

var request = require('requests');

body = {
    "created" : "2015-05-25 18:40:52 +0000",
    "events" :         [
                    {
            "data" :                 {
                "cloudCover" : 2,
                "eventTime" : 1432579252352,
                "id" : "45c05458-677f-7c87-58b0-72832e6e2d54",
                "observerName" : "Harrie",
                "platformHeight" : 17,
                "startLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "startingTime" : 1432579252352,
                "windspeed" : 1,
            },
            "type" : "startSurvey",
        },
                    {
            "data" :                 {
                "category" : 1,
                "dimension" : 2,
                "distance" : 2,
                "endLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "endTime" : 1432579284120,
                "eventTime" : 1432579284133,
                "material" : 2,
                "startLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "startTime" : 1432579281415,
            },
            "type" : "sighting",
        },
                    {
            "data" :                 {
                "category" : 2,
                "dimension" : 1,
                "distance" : 0,
                "endLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "endTime" : 1432579287450,
                "eventTime" : 1432579287463,
                "material" : 0,
                "startLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "startTime" : 1432579284908,
            },
            "type" : "sighting",
        },
                    {
            "data" :                 {
                "eventTime" : 1432579312390,
                "latitude" : "37.78583526611328",
                "longitude" : "-122.4064178466797",
            },
            "type" : "track",
        },
                    {
            "data" :                 {
                "cloudCover" : 3,
                "comment" : "test",
                "endLocation" :                     {
                    "latitude" : "37.78583526611328",
                    "longitude" : "-122.4064178466797",
                },
                "endTime" : 1432579391998,
                "windspeed" : 0,
                "eventTime" : 1432579392011,
            },
            "type" : "finishSurvey",
        }
    ],
    "observer" : "45c05458-677f-7c87-58b0-72832e6e2d54",
}

options = {
  method: "PUT",
  port: 3000,
  path: '/addjson',
};

var req = http.request(options);
req.write(querystring.stringify(body));
console.log(querystring.stringify(body));
req.end();
*/

/*
 -----------
 THE OLD APP
 -----------


// GET Userlist page. 
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e,docs){
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

// GET New User page. 
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User' });
});

// POST to Add User Service 
router.post('/adduser', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var json = req.body.json;
	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"email" : userEmail,
		"json" : json
	}, function (err, doc) {
		if(err) {
			res.send("There was a problem adding the information to the database.");
		}else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});


// PUT to Add User Service 
router.put('/adduser', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	var json = req.body.json;
	var collection = db.get('usercollection');

	collection.insert({
		"username" : userName,
		"email" : userEmail,
		"json" : json
	}, function (err, doc) {
		if(err) {
			res.send("There was a problem adding the information to the database.");
		}else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

// POST to Del User Service 
router.post('/deluser', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.delname;

	// Set our collection
	var collection = db.get('usercollection');

	console.log(userName);
	console.log("-----")
	console.log(req.body);

	// Submit to the DB
	collection.remove({
		"username" : userName
	}, function (err, doc) {
		if(err) {
			// If it failed, return error
			res.send("There was a problem delling the information from the database.");
		}
		else{
			// If it worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// And forward to the success page
			res.redirect("userlist");
		}
	});
});

// POST json 
router.post('/addjson', function(req, res) {
	console.log("-----");
	//console.log(req.headers);
	console.log(req.body);

	var db = req.db;
	var jsonfile = JSON.parse(req.body.json);
	//var jsonfile = MaakSurveyLeesbaar(jsonfile);
	var collection = db.get('usercollection');

	console.log("-----");
	console.log(jsonfile);

	collection.insert(jsonfile, function (err, doc) {
		if(err) {
			res.send("There was a problem adding Jason to the database.");
		}else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});
*/
