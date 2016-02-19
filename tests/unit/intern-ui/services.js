/*
 * This is an example of grouping together a JS folder into just
 * one file for testing. Usually easier to do things this way
 * when everything's related (each service makes use of
 * angular.injector) and the files themselves are small.
 */
if (typeof define === 'function') {
    define([
        'intern!object',
        'intern/chai!assert',
        'intern/order!lib/js/var/URL',
        'intern/order!bower_components/angular/angular',
        'intern/order!bower_components/angular-route/bower-angular-route-1.5.0/angular-route',
        'intern/order!bower_components/angular-mocks/angular-mocks',
        'intern/order!lib/js/var/app',
        'intern/order!lib/js/services/getTests',
        'intern/order!lib/js/services/runFunctionalTests'
    ], test);
} else {
    module.exports = test;
}
function test(registerSuite, assert, URL) {
    var getTests, runFunctionalTests, httpBackend;
    var tests = {
        name: 'services',
        /**
         * We're using setup here because we're mocking two different back-ends.
         * Use beforeEach() if you want to grab from the same mocked back-end
         * multiple times.
         */
        setup: function() {
            angular.injector(['ng', 'ngMock', 'AutomatedTests'])
                .invoke(function(_getTests_, _runFunctionalTests_, $httpBackend) {
                    getTests = _getTests_;
                    runFunctionalTests = _runFunctionalTests_;
                    httpBackend = $httpBackend;
                });
        },
        'getTests': function() {
            var async = this.async(5000); // set a 5 second timeout
            // Mock the response
            httpBackend.whenGET(new RegExp(URL.GET.TEST_MODULES)).respond({
                "sites": ["template"],
                "template": {
                    "unit": [
                        {
                            "name": "all",
                            "num": 2
                        },
                        {
                            "name": "template",
                            "num": 1
                        },
                        {
                            "name": "nested/folder/template",
                            "num": 1
                        }
                    ],
                    "functional": [
                        {
                            "name": "all",
                            "num": 1
                        },
                        {
                            "name": "login",
                            "num": 1
                        }
                    ]
                }
            });
            // Run the service
            getTests.then(async.callback(function(tests) {
                assert.equal(tests[0].name, 'template', 'Data object should have been reorganized');
                assert.equal(tests[0].tests[1].run.tests[1].url, '#/unit/template/nested~@~folder~@~template',
                    'All forward-slashes in the filename should be replaced with ~@~');
                assert.equal(tests[0].tests[1].run.tests[1].name, 'nested/folder/template',
                    'All forward-slashes in the filename should remain in the name');
            }));
            // Need to flush the backend or the test will time out.
            httpBackend.flush();
        },
        'runFunctionalTests': function() {
            var async = this.async(5000); // set a 5 second timeout
            // Mock the response
            httpBackend.whenGET(new RegExp(URL.GET.FUNCTIONAL_TEST)).respond(
                'Globals set' +
                '\nInitializing test "login"' +
                '\nRunning "intern:tests" (intern) task' +
                '\nRunning test "login" using Chrome' +
                '\n >> PASS: Chrome on any platform - login - login (4125ms)' +
                '\n >> 0/1 tests failed' +
                '\n >> 0/1 tests failed' +
                '\nDone, without errors.'
            );
            // Run the service
            runFunctionalTests().then(async.callback(function(data) {
                assert.equal(data[2].pass, true, 'Test should have passed');
                assert.equal(data[2].fail, false, 'Test should have passed');
                assert.equal(data[2].message, "PASS: Chrome on any platform - login - login (4125ms)", 'Test should have passed');
            }));
            // Need to flush the backend or the test will time out.
            httpBackend.flush();
        }
    };
    registerSuite && registerSuite(tests);

    // Output keys for HTML view
    return Object.keys(tests);
}
