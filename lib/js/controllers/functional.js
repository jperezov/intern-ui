define([
    '../var/app',
    '../services/runFunctionalTests'
], function(app) {
    app.controller('FunctionalCtrl', ['$scope', '$routeParams', 'runFunctionalTests', function($scope, $routeParams, runFunctionalTests) {
        $scope.site = $routeParams.site;
        $scope.browser = $routeParams.browser;
        runFunctionalTests($routeParams.site, $routeParams.functionalTest.replace(/~@~/g, '/'), $routeParams.browser)
            .then(function(results) {
                $scope.results = results;
            });
    }]);
    return app;
});
