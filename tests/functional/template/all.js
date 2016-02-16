if (typeof define === 'function') {
    define([
        // Manually require all functional tests here so
        // that the "run -> all" option works in the UI
        './login' // Tests are executed in-order, so always have login first.
    ], function() {});
} else {
    module.exports = function() {};
}
