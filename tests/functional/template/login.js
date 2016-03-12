/*
 * Functional tests must export modules as both AMD (RequireJS) and as node modules. Asynchronous modules
 * are used by The Intern for tests, while the UI itself needs node modules to pull data from.
 */
if (typeof define === 'function') {
    define([
        'intern!object',
        'intern/chai!assert',
        '../../var/URL',
        '../../var/USER',
        '../../helpers/hex'
    ], test);
} else {
    module.exports = test;
}
function test(registerSuite, assert, URL, USER, hex) {
    var tests = {
        name: 'login',
        'login': function() {
            return this.remote
                // Go to your login page
                .get(URL.TEMPLATE.LOGIN)
                // Find and fill out the form for the username
                .findById('username')
                    .click()
                    .pressKeys(USER.TEMPLATE.USERNAME)
                    .end()
                // Find and fill out the form for the password
                .findById('password')
                    .click()
                    // As a word of warning, the password is passed as plaintext to the selenium server.
                    // Do not test privileged accounts on production environments, as this can be insecure.
                    .pressKeys(USER.TEMPLATE.PASSWORD)
                    .end()
                // Click the submit button
                .findById('submit')
                    .click()
                    .end()
                // Wait a half-second for the next page to start loading
                .sleep(500)
                // Up the timeout for find*() functions to allow for the page to finish loading
                .setFindTimeout(15000)
                // Find the username / user's name / whatever. Just something you can check to verify a login.
                .findByCssSelector('.user-name')
                    .getVisibleText()
                .then(function(text) {
                    // Using the user's name in this example.
                    assert.strictEqual(text.toLowerCase(), USER.TEMPLATE.NAME.toLowerCase(), 'User should now be logged in');
                });
        }
    };
    registerSuite && registerSuite(tests);

    // Output keys for HTML view
    return Object.keys(tests);
}
