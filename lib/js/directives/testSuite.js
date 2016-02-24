define([
    '../var/app',
    '../var/URL'
], function(app, URL) {
    app.directive('testSuite', function() {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: URL.TEMPLATE.TEST_SUITE,
            controller: 'TestSuiteCtrl',
            controllerAs: 'tsCtrl'
        };
    });
    return app;
});
