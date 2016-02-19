define([
    '../var/app',
    '../services/getTests'
], function(app) {
    app.controller('MainCtrl', ['$scope', 'getTests', '$location', function($scope, getTests, $location) {
        // Hide the extra scrollbar that appears on the unit test modal
        $scope.$on('$locationChangeSuccess', function() {
            $scope.hideScroll = !!$location.path().toString().match(/\/unit/);
        });
        getTests.then(function(tests) {
            $scope.tests = tests;
        });
    }]);
    return app;
});
