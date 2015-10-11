// General Necessities
var express = require('express');
var router = module.exports = express.Router();
var _ = require('lodash');
var async = require('async');

// Libraries
var log = require('../lib/logger');

/* Here we go! Catch put request and store it. */
router.put('/', function(req, res) {
    var db = req.db;
    var collection = db.get('surveys');
    var surveyData = req.body;

    log.info("New survey");

    if (!surveyData || _.isEmpty(surveyData)) {
        log.error('New survey missing content');
        return res.send({"received":false, "message":"Stuff went wrong. Sorry! Try again?"});
    }

    // Parse plain/text to json (Legacy)
    surveyData = JSON.parse(surveyData);

    async.waterfall([
        function validation (callback) {
            validateSurveyJson(collection, surveyData, callback);
        },
        function checkValidation (validStatus, callback) {
            if (validStatus !== 'valid') {
                log.error('New survey is invalid');
                return callback(true);
            }

            callback();
        },
        function save (callback) {
            collection.insert(surveyData, callback);
        }
    ], function (err) {
        if (err) {
            saveInvalidSurvey(db, surveyData);
            return res.send({"received":false, "message":"Unable to save survey, sorry! Please try again"});
        }

        log.info("Saving survey");
        res.send({"received":true,"message":"We received your survey. Thanks!"});
    });
});

/**
 * validateSurveyJson
 * @private
 *
 * Validate the json provided by the app to prevent false data in database
 *
 * @param  {Collection} collection
 * @param  {Object} survey Survey json
 * @return {Boolean} Validated or not
 */
function validateSurveyJson (collection, surveyData, callback) {
    // Check if survey already exists
    collection.findOne({surveyId: surveyData.surveyId}, function (err, result) {
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

/**
 * saveInvalidSurvey
 * @private
 *
 * Save invalid survey in different collection for later analysis
 * @param  {Object} invalidSurvey
 */
function saveInvalidSurvey (db, invalidSurvey) {
    db.get('invalidSurveys').insert(invalidSurvey, function(err) {
        if (err) {
            log.error(err);
        }

        log.info('Saved invalid survey');
    });
}

