var mongoose = require('mongoose'),
    config = require('urlshortener/config');


exports.connect = function(callback) {
    mongoose.connect('mongodb://' + config.get('mongo:host') + '/' + config.get('mongo:db'));
    mongoose.connection.once('open', callback);
    mongoose.connection.on('error', callback);
};
