if (typeof define === 'function') {
    define([
        // Manually require all unit tests here so that
        // the "run -> all" option works in the UI
        './template',
        './nested/folder/all'
    ], function() {});
} else {
    module.exports = function() {};
}
