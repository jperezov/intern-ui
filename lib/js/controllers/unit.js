define([
    '../var/app'
], function(app) {
    app.controller('UnitCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        $scope.site = $routeParams.site;
        $scope.suite = $routeParams.suite;
        $scope.url = 'node_modules/intern/client.html?config=/tests/intern&suites=/tests/unit/' +
            $routeParams.site + '/' + $routeParams.suite.replace(/~@~/g, '/');
    }]);
    return app;
});
