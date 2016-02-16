/*
 * Unit tests must export modules as both AMD (RequireJS) and as node modules. Asynchronous modules
 * are used by The Intern for tests, while the UI itself needs node modules to pull data from.
 */
if (typeof define === 'function') {
    // Asynchronous Module Definition (AMD) used by The Intern library
    define([
        'intern!object',
        'intern/chai!assert',
        'require'
        // your dependencies
    ], test);
} else {
    // Node Module export used for the UI
    module.exports = test;
}
// This is the test itself
function test(registerSuite, assert, require /*your dependencies*/) {
    var tests = {
        // Name of the test suite
        name: 'template',
        // Name of a specific test
        'test': function() {
            assert.equal(true, true);
        }
    };
    registerSuite && registerSuite(tests);

    // Output keys for HTML view
    var keys = Object.keys(tests);
    keys.splice(0, 1);
    return keys;
}
