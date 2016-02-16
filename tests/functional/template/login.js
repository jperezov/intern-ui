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
                // Add password in an obfuscated manner to not pass through plaintext value
                // Not exactly "secure", but at least it's not viewable at-a-glance within
                // your test logs within Browserstack / Saucelabs / whatever.
                .execute(function(a) {
                    /* TODO: DELETE THIS COMMENT (if you actually use this)
                     * "\x76\x61\x6C\x75\x65"                                     == "value"
                     * "\x70\x61\x73\x73\x77\x6F\x72\x64"                         == "password"
                     * "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64" == "getElementById"
                     *
                     * document[_0x48f7[2]](_0x48f7[1])[_0x48f7[0]] == document.getElementById("password").value
                     *
                     * This is done so you can't just CTRL + F "password" and find the password on the log pages.
                     * Again, this isn't secure. Don't go using admin-level production accounts for your testing.
                     */
                    var _0x48f7 = ["\x76\x61\x6C\x75\x65","\x70\x61\x73\x73\x77\x6F\x72\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64"];
                    document[_0x48f7[2]](_0x48f7[1])[_0x48f7[0]] = eval('"' + a + '"');
                }, [hex.encode(USER.TEMPLATE.PASSWORD)])
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
    var keys = Object.keys(tests);
    keys.splice(0, 1);
    return keys;
}
