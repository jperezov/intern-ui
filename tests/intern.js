define([
    'intern',
    './var/dateTime',
    './var/globals',
    'intern/dojo/text!./environments.json'
], function(intern, dateTime, globals, environments) {
    var site = globals.get('site');
    var isGruntTask = globals.get('isGruntTask');
    var browser = globals.get('browser');
    var functionalTest = globals.get('functionalTest');
    // intern/dojo/text pulls in a file as text--we need to convert it into an object
    environments = JSON.parse(environments);

    if (isGruntTask) {
        // Remove unit tests when running grunt task for functional tests (or things get wonky)
        delete intern.args.suites;
        // Environments are found in your tests/environments.json folder
        // Assuming only one environment at a time
        var environment = environments[browser];
        console.log('Running test "' + functionalTest + '" using ' + environment.browserName);
    } else {
        // Otherwise, conditionally add packages for unit tests

        // These map directly to the packages in cPackages
        var projects = {
            /**
             * "template" is a project. The array defines which packages it uses.
             * In this example, template *only* uses jQuery.
             */
            template: [
                'jquery'
            ],
            /**
             * The intern-ui project uses angular and angular-route as a dependency, so we include that cPackage here.
             */
            'intern-ui': [
                'angular',
                'ngRoute'
            ]
        };
        var packages = [];
        // All custom packages
        var cPackages = {
            /**
             * These packages are here for when you *don't* want to include a file as a dependency, but *do*
             * want to include them for testing.
             */
            jquery: {
                name: 'jquery',
                location: 'bower_components/jquery/dist',
                main: 'jquery'
            },
            angular: {
                name: 'angular',
                location: 'bower_components/angular',
                main: 'angular'
            },
            ngRoute: {
                name: 'ngRoute',
                location: 'bower_components/angular-route/',
                main: 'angular-route'
            }
        };
        var includedPackages = {};
        var suites, internConfig, addSuites;
        // Create a new array for the suites to ensure we don't mess with the test suites.
//~~REMOVE_START~~
        if (intern && intern.args && intern.args.suites) {
//~~REMOVE_END~~
            suites = Array.prototype.slice.apply(intern.args.suites);
//~~REMOVE_START~~
        } else {
            suites = [
                'tests/unit/intern-ui/all'
            ];
            addSuites = true;
        }
//~~REMOVE_END~~
        // Add packages based on the project being tested
        // Don't mess with this. I mean, you can if you want, but
        // everything will probably break.
        for (var _suite in suites) {
            for (var _project in projects) {
                //noinspection JSUnfilteredForInLoop <-- these are to get my IDE to stop bitching.
                if (suites[_suite].match(_project)) {
                    //noinspection JSUnfilteredForInLoop --- I mean, seriously. I'm only including 3 dependencies.
                    for (var _package in projects[_project]) {
                        // Only include a package once
                        //noinspection JSUnfilteredForInLoop --- There's really no need for hasOwnProperty here.
                        if (projects[_project][_package] in includedPackages === false) {
                            //noinspection JSUnfilteredForInLoop --- I'm not using it out of principle.
                            packages.push(cPackages[projects[_project][_package]]);
                            //noinspection JSUnfilteredForInLoop
                            includedPackages[projects[_project][_package]] = true;
                        }
                    }
                }
            }
        }
    }
    internConfig = {
        runType: 'runner',
        proxyPort: 9000,
        proxyUrl: 'http://localhost:9000/',
        // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
        // specified browser environments in the `environments` array below as well. See
        // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
        // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
        // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
        // automatically
        capabilities: {
            name: site + '-' + dateTime,
            seleniumVersion: '2.48.2',
            maxDuration: 1200, // 20 minutes
            idleTimeout: 90
        },
        // The amount of time it takes for an asynchronous operation to time out (in milliseconds)
        defaultTimeout: 120000,
        // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
        // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
        // capabilities options specified for an environment will be copied as-is
        environments: [ environment ],
        // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
        maxConcurrency: 1,
        tunnel: 'BrowserStackTunnel',
        // Uncomment if you wanna use saucelabs instead
        // tunnel: 'SauceLabsTunnel',
        tunnelOptions: {
            // verbose: true, // Uncomment if you need help debugging
            username: 'your_username', // <-- You can move this into a config.json thing if you want
            accessKey: 'your_access_key', // <-- This too.
            tunnelId: site + '-' + dateTime
            // This is only used with saucelabs. Uncomment if you need it.
            // executable: '../../../../../sauce_connect/bin/sc.exe'
        },
        // Configuration options for the module loader; any AMD configuration options supported by
        // the specified AMD loader can be used here
        loaderOptions: {
            // Packages that should be registered with the loader in each testing environment
            packages: packages
        },
        // A regular expression matching URLs to files that should not be included in code coverage analysis
        excludeInstrumentation: /node_modules|sauce_connect|tests/
    };
//~~REMOVE_START~~
    if (addSuites) {
        internConfig.suites = suites;
        delete internConfig.tunnelOptions;
        internConfig.tunnel = 'SauceLabsTunnel';
        internConfig.environments = [ { browserName: 'chrome', version: '48', platform: 'Windows 8' }]
    }
//~~REMOVE_END~~
    return internConfig;
});
