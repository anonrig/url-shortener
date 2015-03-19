var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ViewSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    url: { type: String, required: true },
    counter: { type: Number, default: 0},
    referrers: Array
});

/**
 * Increments counter of the current view.
 */
ViewSchema.methods.incrementCounter = function() {
    this.counter += 1;
};

/**
 * Adds referrer to the current view.
 * TODO: Check uniqueness of the referrers
 *
 * @param link
 */
ViewSchema.methods.addReferrer = function(link) {
    this.referrers.push(link);
};

module.exports = mongoose.model('View', ViewSchema);
