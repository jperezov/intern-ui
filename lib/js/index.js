define([
    './var/app',
    './var/URL',
    './controllers/main',
    './controllers/unit',
    './controllers/functional',
    './controllers/testSuite',
    './directives/site',
    './directives/testSuite'
], function(app, URL) {
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: URL.VIEW.HIDDEN
            })
            .when('/unit/:site/:suite', {
                controller: 'UnitCtrl',
                templateUrl: URL.VIEW.MODAL.UNIT
            })
            .when('/functional/:site/:functionalTest/:browser', {
                controller: 'FunctionalCtrl',
                templateUrl: URL.VIEW.MODAL.FUNCTIONAL
            })
            .otherwise({
                redirectTo: '/'
            })
    });
});
