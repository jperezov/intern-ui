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
            return resp.data;
        }, function(err) {
            return err;
        });
    }]);
    return app;
});
