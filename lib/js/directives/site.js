define([
    '../var/app',
    '../var/URL'
], function(app, URL) {
    app.directive('site', function() {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            templateUrl: URL.TEMPLATE.SITE
        };
    });
    return app;
});
