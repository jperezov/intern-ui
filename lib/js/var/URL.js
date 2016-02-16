define(function() {
    return {
        // Templates for directives
        TEMPLATE: {
            SITE: 'assets/templates/site.html',
            TEST_SUITE: 'assets/templates/testSuite.html'
        },
        // Templates for routes
        VIEW: {
            HIDDEN: 'assets/views/hidden.html',
            MODAL: {
                UNIT: 'assets/views/modal/unit.html',
                FUNCTIONAL: 'assets/views/modal/functional.html'
            }
        },
        GET: {
            CONFIG: 'config.json',
            TEST_MODULES: 'getTests.js',
            FUNCTIONAL_TEST: 'runner.js'
        },
        RUN: {
            /**
             * @param site
             * @param suite
             * @returns {string}
             */
            UNIT: function(site, suite) {
                return '#/unit/' + site + '/' + suite;
            },
            /**
             * @param site
             * @param functionalTest
             * @returns {string}
             */
            FUNCTIONAL:function(site, functionalTest) {
                return '#/functional/' + site + '/' + functionalTest;
            }
        }
    };
});
