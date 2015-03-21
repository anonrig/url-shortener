/**
 * @author Can Kutlu Kinay <me@ckk.im>
 */

var async = require('async'),
    Account = require('urlshortener/components/account/model'),
    View = require('urlshortener/components/view/model');

var debug = !!~process.argv.indexOf('--debug') || !!~process.argv.indexOf('-d');
var reset = !!~process.argv.indexOf('--reset');

if (!process.env.NODE_ENV) {
    console.error('No environment is set.\n' +
    'Please set NODE_ENV before running.\n' +
    'Exiting.');
    process.exit(2);
}

var log = debug ? console.log.bind(console) : function() {};

async.waterfall([
    require('urlshortener/lib/db').connect,

    function(next) {
        if (reset) {
            log('Reset flag is on. Resetting mongo database.');
            require('mongoose').connection.db.dropDatabase(next);
        } else
            next(null, null);
    },

    function(success, next) {
        log('Creating users...');
        new Account({
            name: 'Dummy User',
            email: 'anonrig@github.com'
        })
            .setPassword('asdf123')
            .save(next);
    },

    function(err, user, next) {
        log('Creating views...');
        new View({
            url: 'http://github.com/anonrig',
            token: 'anonrig'
        }).save(next);
    },

], function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Fixture data created.');
    process.exit(0);
});
