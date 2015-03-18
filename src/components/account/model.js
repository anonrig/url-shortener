var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AccountSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    salt: String
});

module.exports = mongoose.model('Account', AccountSchema);
