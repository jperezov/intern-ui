var fs = require('fs'),
    sites = fs.readdirSync('./tests/unit'),
    output = { sites: Array.prototype.slice.apply(sites) },
    tests,
    testCount = 0,
    testTypes = ['unit', 'functional'],
    type,
    site;

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
            countTests(output, site, type, tests);
            output[site][type][0].num = testCount;
            testCount = 0;
        } catch (err) {
            // I mean, we don't *really* need to do anything here.
        }
    }
}
function countTests(output, site, type, tests) {
    var file, filename, test, count;
    try {
        for (var testKey in tests) {
            //noinspection JSUnfilteredForInLoop
            test = tests[testKey];
            filename = './tests/' + type + '/' + site + '/' + test;
            if (filename.match(/\.js/)) {
                file = require(filename)();
                count = file && file.length || 0;
                testCount += +count;
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
                countTests(output, site, type, subTests);
            }
        }
    } catch (err) {
        // Nothing to do here either.
    }
}

console.log(JSON.stringify(output));
