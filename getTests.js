var fs = require('fs'),
    sites = fs.readdirSync('./tests/unit'),
    output = { sites: Array.prototype.slice.apply(sites) },
    tests,
    testTypes = ['unit', 'functional'],
    type,
    site,
    allKey;
/**
 * Using this.testCount so that the context
 * can be changed when calling countTests()
 * @type {number}
 */
this.testCount = 0;

for (var siteKey in sites) {
    //noinspection JSUnfilteredForInLoop
    site = sites[siteKey];
    output[site] = {};
    for (var testType in testTypes) {
        //noinspection JSUnfilteredForInLoop
        type = testTypes[testType];
        try {
            tests = fs.readdirSync('./tests/' + type + '/' + site);
            output[site][type] = [];
            countTests.apply(this, [output, site, type, tests]);
            output[site][type][0].num = this.testCount;
            this.testCount = 0;
        } catch (err) {
            // I mean, we don't *really* need to do anything here.
        }
    }
}
/**
 * Returns tests grouped by file / project, along with a count on the
 * number of tests.
 */
function countTests(output, site, type, tests) {
    var file, filename, test, count, key, index;
    // These are reserved words for intern tests
    var reserved = ['name', 'setup', 'beforeEach', 'afterEach', 'teardown'];
    try {
        for (var testKey in tests) {
            //noinspection JSUnfilteredForInLoop
            test = tests[testKey];
            filename = './tests/' + type + '/' + site + '/' + test;
            if (filename.match(/\.js/)) {
                file = require(filename)();
                // This removes reserved words from the test arrays to keep the test counts accurate.
                if (file) for (key in reserved) (index = file.indexOf(reserved[key])) > -1 && file.splice(index, 1);
                count = file && file.length || 0;
                this.testCount += +count;
                if (filename.match(/all\.js/)) {
                    allKey = output[site][type].length;
                }
                output[site][type].push({
                    name: test.replace(/\..*/, ''),
                    num: count
                });
            } else if (filename.match(/mock/)) {
                // "mock" is a reserved folder name. It's here to allow for your own custom
                // files needed for your tests (that you don't actually want tested).
                // In other words, if you need some JS to whip up some DOM elements,
                // or some other prerequisites for your tests, and you don't want
                // *that* JS to get tested, put it in the /mock/ folder
            } else {
                var subTests = fs.readdirSync(filename).map(function(val) {
                    // Gotta append the folder name for nested folders (so the paths match)
                    return test + '/' +val;
                });
                this.testCount += (function() {
                    //noinspection JSPotentiallyInvalidUsageOfThis
                    this.testCount = 0;
                    countTests.apply(this, [output, site, type, subTests]);
                    //noinspection JSPotentiallyInvalidUsageOfThis
                    return output[site][type][allKey].num = this.testCount;
                })();
            }
        }
    } catch (err) {
        // Nothing to do here either.
    }
}

console.log(JSON.stringify(output));
