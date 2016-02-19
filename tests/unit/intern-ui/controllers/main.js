/*
 * This is an example of keeping file separation with
 * unit tests. This is the preferred method when files
 * are larger (to keep your tests better organized).
 */
if (typeof define === 'function') {
    // Asynchronous Module Definition (AMD) used by The Intern library
    define([
        'intern!object',
        'intern/chai!assert',
        'intern/order!/lib/js/var/URL',
        'intern/order!/bower_components/angular/angular',
        'intern/order!/bower_components/angular-route/bower-angular-route-1.5.0/angular-route',
        'intern/order!/bower_components/angular-mocks/angular-mocks',
        'intern/order!/lib/js/var/app',
        'intern/order!/lib/js/controllers/main'
    ], test);
} else {
    // Node Module export used for the UI
    module.exports = test;
}
// This is the test itself
function test(registerSuite, assert, URL) {
    var ctrl, scope, location, httpBackend;
    var tests = {
        // Name of the test suite
        name: 'mainCtrl',
        /**
         * We're using beforeEach here because this action is required for each test.
         * Use setup() if you only need this to run once.
         */
        beforeEach: function() {
            angular.injector(['ng', 'ngMock', 'AutomatedTests'])
                .invoke(function($controller, $rootScope, $location, $httpBackend) {
                    scope = $rootScope.$new();
                    ctrl = $controller('MainCtrl', { $scope: scope });
                    location = $location;
                    httpBackend = $httpBackend;
                });
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
        },
        'tests': function() {
            // MainCtrl depends on the getTests service, so make sure we flush() the backend to get our data.
            httpBackend.flush();
            // Grab tests from $scope
            var tests = scope.tests;
            // Grab hideScroll from $scope
            var hideScroll = scope.hideScroll;
            assert.equal(tests[0].name, 'template', 'Data object should have been reorganized');
            assert.equal(tests[0].tests[1].run.tests[1].url, '#/unit/template/nested~@~folder~@~template',
                'All forward-slashes in the filename should be replaced with ~@~');
            assert.equal(tests[0].tests[1].run.tests[1].name, 'nested/folder/template',
                'All forward-slashes in the filename should remain in the name');
            assert.equal(hideScroll, false, 'We should not be in the /unit path');
        },
        'hideScroll': function() {
            // Force the location to be /unit
            location.path('/unit');
            // MainCtrl depends on the getTests service, so make sure we flush() the backend to get our data.
            httpBackend.flush();
            // Get the hideScroll option
            var hideScroll = scope.hideScroll;
            assert.equal(hideScroll, true, 'We should be in the /unit path');
        }
    };
    registerSuite && registerSuite(tests);

    // Output keys for HTML view
    return Object.keys(tests);
}
