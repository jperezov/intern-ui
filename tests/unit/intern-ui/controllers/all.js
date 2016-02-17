if (typeof define === 'function') {
    define([
        // Manually require all unit tests here so that
        // the "run -> controllers/all" option works in the UI
        './mainCtrl'
    ], function() {});
} else {
    module.exports = function() {};
}
