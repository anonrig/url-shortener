var router = require('express').Router(),
    APIError = require('urlshortener/lib/error'),
    auth = require('urlshortener/lib/auth');

var Account = require('./model');


/**
 * Create view path.
 */
router.post('/', auth.ensureAuthentication, function(req, res, next) {
    var view = req.body;

    if (!view.url)
        next(new APIError('Bad request', 400));

    new View({
        url: view.url
    })
        .save(function(err) {
            if (err) return next(err);

            res.status(201).end();
        });
});


module.exports = router;
