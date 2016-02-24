define([
    '../var/app',
    '../services/getBrowsers'
], function(app) {
    app.controller('TestSuiteCtrl', ['getBrowsers', function(getBrowsers) {
        var tsCtrl = this;
        getBrowsers.then(function(browsers) {
            tsCtrl.browser = {
                id: 0
            };
            tsCtrl.browsers = browsers;
        });
    }]);
    return app;
});
