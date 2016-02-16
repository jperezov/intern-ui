/**
 * Returns an object containing arrays of file paths for the tests in a project
 *
 * Access with tests[site].unit and tests[site].functional.
 *
 * @type object
 */
module.exports = function(functionalTest) {
    var fs = require('fs'),
        sites = fs.readdirSync('./tests/functional'),
        output = {},
        tests,
        site;

    for (var siteKey in sites) {
        //noinspection JSUnfilteredForInLoop
        site = sites[siteKey];
        output[site] = {
            unit: [
                'tests/unit/' + site + '/all'
            ],
            functional: [
                'tests/functional/' + site + '/' + functionalTest
            ]
        };
    }
    return output;
};
