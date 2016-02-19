/*
 * This file is nested to show how nested folders are displayed in the UI.
 * This test will run when
 *
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
        // Name of the test suite. This is the display name in intern, so make sure to explicitly
        // write out the file path if you want it displayed
        name: 'nested/folder/template',
        setup: function() {
            // runs once, at the beginning of the test suite
        },
        beforeEach: function() {
            // runs before each test
        },
        afterEach: function() {
            // runs after each test
        },
        teardown: function() {
            // runs once, at the end of the test suite
        },
        // Name of a specific test
        'test': function() {
            assert.equal(true, true);
        }
    };
    registerSuite && registerSuite(tests);

    // Output keys for HTML view
    return Object.keys(tests);
}
