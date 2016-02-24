define([
    '../var/app',
    '../var/URL'
], function(app, URL) {
    app.factory('getBrowsers', ['$http', function($http) {
        return $http({
            method: 'GET',
            url: URL.GET.BROWSERS,
            cache: true
        }).then(function(resp) {
            var env = resp.data;
            var browsers = [{
                id: 'all',
                label: 'All'
            }];
            for (var i in env) {
                if (env.hasOwnProperty(i)) {
                    browsers.push({
                        id: i,
                        label: env[i].browserName
                    });
                }
            }
            return browsers;
        }, function(err) {
            return err;
        });
    }]);
    return app;
});
