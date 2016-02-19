define([
    '../var/app',
    '../var/URL'
], function(app, URL) {
    app.factory('getTests', ['$http', function($http) {
        return $http({
            method: 'GET',
            url: URL.GET.TEST_MODULES,
            cache: true
        }).then(function(resp) {
            var inputTest,
                functionalTests,
                unitTests,
                tests = resp.data,
                output = [];
            // Build the test display object
            for (var test in tests.sites) {
                //noinspection JSUnfilteredForInLoop
                (function(site) {
                    inputTest = {
                        name: site.replace(/([a-z])([A-Z])/g, "$1 $2"),
                        tests: []
                    };
                    if (tests[site].functional) {
                        functionalTests = tests[site].functional.slice(1).map(function(val) {
                            val.url = URL.RUN.FUNCTIONAL(site, val.name.replace(/\//g, '~@~'));
                            return val;
                        });
                        inputTest.tests.push({
                            name: site,
                            type: 'functional',
                            description: 'Run these to simulate a real user.',
                            browser: 0, // Default to Chrome
                            run: {
                                all: {
                                    name: 'All Tests',
                                    url: URL.RUN.FUNCTIONAL(site, 'all'),
                                    num: tests[site].functional[0].num
                                },
                                tests: functionalTests
                            }
                        });
                    }
                    if (tests[site].unit) {
                        unitTests = tests[site].unit.slice(1).map(function(val) {
                            val.url = URL.RUN.UNIT(site, val.name.replace(/\//g, '~@~'));
                            return val;
                        });
                        inputTest.tests.push({
                            name: site,
                            type: 'unit',
                            description: 'Run these to ensure the code works as intended.',
                            run: {
                                all: {
                                    name: 'All Tests',
                                    url: URL.RUN.UNIT(site, 'all'),
                                    num: tests[site].unit[0].num
                                },
                                tests: unitTests
                            }
                        });
                    }
                    output.push(inputTest);
                })(tests.sites[test]);
            }
            return output;
        }, function(err) {
            return err;
        });
    }]);
    return app;
});
