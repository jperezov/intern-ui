define([
    '../var/app',
    '../var/URL',
    '../var/isNaN'
], function(app, URL, isNaN) {
    app.factory('runFunctionalTests', ['$http', function($http) {
        return function(site, functionalTest, browser) {
            return $http({
                method: 'GET',
                url: URL.GET.FUNCTIONAL_TEST,
                params: {
                    site: site,
                    functionalTest: functionalTest,
                    browser: browser
                },
                cache: true
            }).then(function(resp) {
                return resp.data
                    .replace(/Globals\sset/g, '')
                    .replace(/Initializing\stest\s\d/g, '')
                    .replace(/.*Running\s".*/g, '')
                    .replace(/\s*\bat\b.*/g, '')
                    .replace(/.>>\s./g, '')
                    //.replace(/.\n$/, '')
                    .split(/\n/)
                    .filter(function(n) {
                        return n;
                    })
                    .map(function(val) {
                        var pass = false;
                        var fail = false;
                        if (isNaN(val.trim()[0]) === false) {
                            var numerator = +val.trim().match(/\d*\b/)[0];
                            fail = numerator !== 0;
                        } else {
                            pass = !!val.match(/\bpass\b/i);
                            fail = !!val.match(/\b(fail|error)\b/i);
                        }
                        return {
                            pass: pass,
                            fail: fail,
                            message: val
                        };
                    });
            }, function(err) {
                return err;
            });
        };
    }]);
    return app;
});
