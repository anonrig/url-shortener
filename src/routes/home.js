var express = require('express'),
    router = express.Router();

var View = require('urlshortener/components/view/model');

/**
 * Root path.
 */
router.get('/', function(req, res) {
    res.render('index', { message: 'Hello world' });
});

/**
 * Main function called for Url Shortening.
 */
router.get('/:token', function(req, res) {
    View.findOne({ 'token': req.params.token }, function(err, view) {
        if (!err && !view)
            res.render('404');
        else if (err)
            res.render('500');
        else {
            view.incrementCounter();

            if (req.headers.referrer)
                view.addReferrer(req.headers.referrer);

            view.save(function(err) {
                if (err) res.render('500');

                res.render('view', { 'url': view.url });
                /**
                 * Alternative solution to HTML5 Refresh.
                 */
                // res.redirect(view.url);
            });
        }

    });
});

module.exports = router;
