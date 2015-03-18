var router = require('express').Router(),
    APIError = require('urlshortener/lib/error');

var Account = require('./model');


router.post('/', function(req, res, next) {
    var account = req.body;

    new Account({
        uuid: account.uuid
    })
        .save(function(err) {
            if (err) return res.send(new APIError(err));
            res.status(201).end();
        });
});


module.exports = router;
