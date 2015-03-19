var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('urlshortener/lib/crypto');



var ViewSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true, default: crypto.generateRandomString(null, 6)},
    url: { type: String, required: true },
    counter: { type: Number, default: 0},
    referrers: { type: Object }
});

/**
 * Increments counter of the current view.
 */
ViewSchema.methods.incrementCounter = function() {
    this.counter += 1;
};

/**
 * Adds referrer to the current view.
 *
 * @param link
 */
ViewSchema.methods.addReferrer = function(link) {
    this.referrers[link] = this.referrers[link] ? this.referrers[link]++ : 1;
};

module.exports = mongoose.model('View', ViewSchema);
