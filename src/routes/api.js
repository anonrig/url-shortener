var express = require('express'),
    router = express.Router();


router.use('/accounts', require('urlshortener/components/account/controller'));

module.exports = router;
