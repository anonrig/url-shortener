var express = require('express'),
    router = express.Router();

var View = require('urlshortener/components/view/model');

router.get('/', function(req, res) {
    res.render('index', { message: 'Hello world' });
});

router.get('/:token', function(req, res) {
    View.findOne({ 'token': req.params.token }, function(err, current) {
        if (!err && !current)
            res.render('404');
        else if (err)
            res.render('500');
        else
            res.render('view', { 'url': current.url });
    })
});

module.exports = router;
