var crypto = require('crypto');


exports.sha256 = function(password) {
    var shasum = crypto.createHash('sha256');

    shasum.update(password);
    return shasum.digest('hex');
};

exports.generateRandomString = function(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz',
        string = '';

    length = length ? length : 32;

    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string;
};
