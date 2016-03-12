if (typeof define === 'function') {
    define([
        // Manually require all unit tests here so that
        // the "run -> nested/folder/all" option works in the UI
        './template'
    ], function() {});
} else {
    module.exports = function() {};
}
