var db = require('urlshortener/lib/db'),
    app = require('urlshortener/app/index'),
    handle = require('urlshortener/lib/handlers/system'),
    async = require('async');


async.series(
    [
        db.connect,
        app.listenBound
    ],
    handle('App init')
);
