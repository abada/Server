// Modules
var express = require('express');
var router = module.exports = express.Router();
var _ = require('lodash');
var moment = require('moment');

// Middleware
var authorisation = require('../middleware/authorisation');

/**
 * GET Surveys
 *
 * Authorisation middleware
 */
router.get('/surveys', authorisation, function(req, res) {
    var find = {
        startDate: '1-1-2000',
        endDate: '1-1-2100'
    };
    var options = {
        limit: 0,
        sort: { created: 1},
    };
    // Options
    if (req.query && req.query.limit) {
        options.limit = req.query.limit;
    }

    // Sort
    if (req.query && req.query.sort) {
        options.sort[req.query.sort] = 1;
    }

    // Reverse
    if (req.query && req.query.reverse) {
        if (req.query.sort) {
            options.sort[req.query.sort] = -1;
        } else {
            options.sort.created = -1;
        }
    }

    // Startdate
    if (req.query && req.query.startDate) {
        find.startDate = req.query.startDate;
    }

    // Enddate
    if (req.query && req.query.endDate) {
        find.endDate = req.query.endDate;
    }

    var query = { created: { $gt: moment(new Date(find.startDate)).format(), $lt: moment(new Date(find.endDate)).format() },  events: { $not: {$elemMatch: { 'data.comment': '[TEST SURVEY]' } } } };

     // Include test
    if (req.query && req.query.includeTest) {
        query = { created: { $gt: moment(new Date(find.startDate)).format(), $lt: moment(new Date(find.endDate)).format() } };
    }

    req.db.get('surveys').find(query, options, function (err, result) {
        if (err || !result) {
            return res.send({error: 'unableToFindSurvey'});
        }

        return res.send(result);
    });
});


/**
 * GET Surveys
 *
 * Authorisation middleware
 */
router.get('/surveys/:surveyId', authorisation, function(req, res) {
    if (!req.params) {
        return res.send({error: 'noSurveyId'});
    }

    req.db.get('surveys').findOne({surveyId: req.params.surveyId}, function (err, result) {
        if (err || !result) {
            return res.send({error: 'unableToFindSurvey'});
        }

        return res.send(result);
    });
});
