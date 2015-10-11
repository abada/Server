var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/survey');
var async = require('async');
var _ = require('lodash');

var counter = 0;

db.get('surveys').find({}, {fields: { _id: 0}}, function(err, surveys) {
    if (err) {
        console.log('****', err);
    }

    async.eachSeries(surveys, function (item, callback) {
        console.log('Processing # ', counter, item);
        counter++;

        validateSurveyJson(item, function (err, result) {
            console.log('Result', result);
            if (result !== 'valid') {
                db.get('surveys_invalid').insert(item, callback);
            } else {
                db.get('surveys_clean').insert(item, callback);
            }
        });
    }, function done(err) {
        console.log('Done! Any error?', err);
    });
});


function validateSurveyJson (surveyData, callback) {
    // Check if survey already exists
    db.get('surveys_clean').findOne({surveyId: surveyData.surveyId}, function (err, result) {
        // Found a result, so do not save
        if (result) {
            return callback(null, 'Duplicate');
        }

        var timeEvents = surveyData.events;

        // Check if the survey has a start event
        if (!_.find(timeEvents, function(timeEvent) { return timeEvent.type === 'startSurvey'; })) {
            return callback(null, 'noStart');
        }

        // Check if the survey has a finish event
        if (!_.find(timeEvents, function(timeEvent) { return timeEvent.type === 'finishSurvey'; })) {
            return callback(null, 'noFinish');
        }

        if (!_.find(timeEvents, function(timeEvent) { return timeEvent.type === 'track'; })) {
            return callback(null, 'noTrack');
        }

        var sightings = _.filter(timeEvents, function(timeEvent) { return timeEvent.type === 'sighting'; });

        if (sightings.length > 0) {
            var invalid = false;
            _.forEach(sightings, function (sighting) {
                if (_.isEmpty(sighting.data)) {
                    invalid = true;
                }
            });

            if (invalid) {
                return callback(null, 'invalidSighting');
            }
        }

        callback(null, 'valid');
    });
}

