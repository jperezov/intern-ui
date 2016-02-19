/*
 * This is an example of keeping file separation with
 * unit tests. This is the preferred method when files
 * are larger (to keep your tests better organized).
 */
if (typeof define === 'function') {
    define([
        // Manually require all unit tests here so that
        // the "run -> controllers/all" option works in the UI
        './main'
    ], function() {});
} else {
    module.exports = function() {};
}
