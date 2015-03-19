var router = require('express').Router(),
    APIError = require('urlshortener/lib/error');

var Account = require('./model');


/**
 * Create user path.
 *
 * TODO: Implement dummy data generator for first user.
 */
router.post('/', function(req, res, next) {
    var user = req.body;

    if (!user.email || !user.password || !user.name)
        next(new APIError('Bad request', 400));

    new Account({
        name: user.name || '',
        email: user.email
    })
        .setPassword(user.password)
        .save(function(err) {
            if (err) return next(err);

            res.status(201).end();
        });
});


module.exports = router;
