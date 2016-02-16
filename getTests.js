var fs = require('fs'),
    sites = fs.readdirSync('./tests/functional'),
    output = { sites: Array.prototype.slice.apply(sites) },
    tests,
    filename,
    file,
    count = 0,
    testCount = 0,
    testTypes = ['unit', 'functional'],
    type,
    site,
    test;

for (var siteKey in sites) {
    //noinspection JSUnfilteredForInLoop
    site = sites[siteKey];
    output[site] = {};
    for (var testType in testTypes) {
        //noinspection JSUnfilteredForInLoop
        type = testTypes[testType];
        tests = fs.readdirSync('./tests/' + type + '/' + site);
        output[site][type] = [];
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
            }
        }
        output[site][type][0].num = testCount;
        testCount = 0;
    }
}

console.log(JSON.stringify(output));
