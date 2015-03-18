/**
 * Prints error message with what is prevented by it.
 *
 * @param {string} process
 * @param {function=} next
 * @returns {Function}
 */
module.exports = function (process, next) {
    return function (err) {
        if (err)
            return console.error('Failed: ' + process + '\n', err);
        console.log('Success: ' + process);
        next && next();
    }
};
