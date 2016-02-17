define([
    '../var/app',
    '../var/URL',
    '../services/getTests'
], function(app, URL) {
    app.controller('MainCtrl', ['$scope', 'getTests', '$location', function($scope, getTests, $location) {
        // Hide the extra scrollbar that appears on the unit test modal
        $scope.$on('$locationChangeSuccess', function() {
            $scope.hideScroll = $location.path().toString().match(/\/unit/);
        });
        getTests.then(function(tests) {
            var inputTest,
                functionalTests,
                unitTests;
            $scope.tests = [];
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
                            val.url = URL.RUN.FUNCTIONAL(site, val.name.replace(/\//, '~@~'));
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
                            val.url = URL.RUN.UNIT(site, val.name.replace(/\//, '~@~'));
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
                    $scope.tests.push(inputTest);
                })(tests.sites[test]);
            }
        });
    }]);
    return app;
});
