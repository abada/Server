// Libraries
var config = require('../lib/config');

function authorization(req, res, next) {
    "use strict";

    if (!req.query || req.query.token !== config.token) {
        return res.send({error: 'notAuthorized'});
    }

    next();
}

module.exports = authorization;
