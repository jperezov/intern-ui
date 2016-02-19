module.exports = function(grunt) {
    var globals = require('./tests/var/globals'),
        task = grunt.cli.tasks[0] || 'build',
        site = grunt.option('site') || "'No Tests Selected'",
        browser = grunt.option('browser') || 0,
        functionalTest = grunt.option('functionalTest') || 'all',
        tests = require('./tests/testModules')(functionalTest),
        testCmd = 'grunt test --site=' + site + ' --functionalTest=' + functionalTest + ' --browser=',
        pkg = grunt.file.readJSON('package.json');
    // Set global variable process.env.site for access within the config
    if (globals.get('isGruntTask') === undefined && (task === 'test' || task === 'testAllBrowsers')) {
        console.log('Globals set');
        globals.set('site', site);
        globals.set('isGruntTask', true);
        globals.set('functionalTest', functionalTest);
        console.log('Initializing test "' + functionalTest + '"');
    }
    if (task === 'test') {
        globals.set('browser', browser);
    }
    // Error out if the expected unit and functional tests aren't found
    if (
        task !== 'build' &&
        task !== 'installation' &&
        !tests[site] &&
        (Array.isArray(tests[site].unit) && Array.isArray(tests[site].functional)) === false
    ) {
        throw Error('Missing tests. Check to see if ' + site + ' exists in /tests/testModules.js.');
    }
    grunt.initConfig({
        pkg: pkg,
        intern: {
            tests: {
                options: {
                    runType: 'runner', // defaults to 'client'
                    config: 'tests/intern',
                    reporters: [ 'Console', 'Lcov' ],
                    suites: tests[site] && tests[site].unit,
                    functionalSuites: tests[site] && tests[site].functional
                }
            }
        },
        exec: {
            test0: {
                cmd: testCmd + 0
            },
            test1: {
                cmd: testCmd + 1
            },
            test2: {
                cmd: testCmd + 2
            },
            test3: {
                cmd: testCmd + 3
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "lib/js/",
                    name: "index",
                    out: "assets/js/automated-tests.min.js",
                    //-----------------------------------------
                    // We have multiple minify steps
                    optimize: "uglify",
                    uglify: {
                        mangle: false
                    },
                    // Include dependencies loaded with require
                    findNestedDependencies: true,
                    // Avoid inserting define() placeholder
                    skipModuleInsertion: true,
                    // Avoid breaking semicolons inserted by r.js
                    skipSemiColonInsertion: true,
                    wrap: {
                        start: "/**!\n * <%= pkg.name %> v<%= pkg.version %>\n * Copyright (c) " + (new Date()).getFullYear() + " Jonathan Perez.\n * Released under the MIT license\n */\n(function() {\n    \"use strict\";\n",
                        end: "}());"
                    },
                    paths: {
                        /**
                         * This here is used so that I can still list angular as a dependency
                         * within my /lib/js/var/app.js file. It prevents the angular.min.js
                         * file from being concatenated with my custom JS.
                         */
                        'angular': 'empty:', // <-- the colon (:) is required.
                        'ngRoute': 'empty:'
                    },
                    rawText: {},
                    /**
                     * This here strips out all define() wrapper stuff from my modules. I like async modules, but I
                     * don't *actually* want to use RequireJS. This lets me do both! Yay!
                     *
                     * I actually stole this from jQuery (they do their modules like this, too); this here's
                     * my attribution to them: https://github.com/jquery/jquery/blob/master/build/tasks/build.js
                     */
                    onBuildWrite: convert
                }
            }
        },
        copy: {
            main: {
                files: [
                    // Files in /lib
                    {
                        expand: true,
                        cwd: 'lib/templates/',
                        src: ['**'],
                        dest: 'assets/templates/'
                    },
                    {
                        expand: true,
                        cwd: 'lib/views/',
                        src: ['**'],
                        dest: 'assets/views/'
                    },
                    {
                        expand: true,
                        cwd: 'lib/css/',
                        src: ['**'],
                        dest: 'assets/css/'
                    }
                ]
            },
            installation: {
                files: [
                    {
                        expand: true,
                        cwd: 'tests/',
                        src: ['**'],
                        dest: '../../tests'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', [ 'requirejs', 'copy:main' ]);
    grunt.registerTask('test', [ 'intern' ]);
    grunt.registerTask('testAllBrowsers', [ 'exec' ]);
    grunt.registerTask('installation', [ 'build', 'copy:installation' ]);
    grunt.registerTask('default', [ 'build' ]);

    /**
     * Taken from: https://github.com/jquery/jquery/blob/master/build/tasks/build.js
     *
     * Strip all definitions generated by requirejs
     * Convert "var" modules to var declarations
     * "var module" means the module only contains a return
     * statement that should be converted to a var declaration
     * This is indicated by including the file in any "var" folder
     * @param {String} name
     * @param {String} path
     * @param {String} contents The contents to be written (including their AMD wrappers)
     */
    function convert(name, path, contents) {
        var rdefineEnd = /\}\s*?\);[^}\w]*$/;
        // Convert var modules
        if ( /.\/var\//.test( path ) ) {
            contents = contents
                .replace(/define\([\w\W]*?return/, "    var " + (/var\/([\w-]+)/.exec(name)[1]) + " =")
                .replace(rdefineEnd, "")
                .replace(/\/\*\*/, "    \/**")
                .replace(/\s\*\s/g, "     * ")
                .replace(/\s\*\//g, "     */");
        } else {
            contents = contents
                .replace(/\s*return\s+[^\}]+(\}\s*?\);[^\w\}]*)$/, "$1")
                // Multiple exports
                .replace(/\s*exports\.\w+\s*=\s*\w+;/g, "");

            // Remove define wrappers, closure ends, and empty declarations
            contents = contents
                .replace(/define\([^{]*?{/, "")
                .replace(rdefineEnd, "");

            // Remove anything wrapped with
            // /* ExcludeStart */ /* ExcludeEnd */
            // or a single line directly after a // BuildExclude comment
            contents = contents
                .replace(/\/\*\s*ExcludeStart\s*\*\/[\w\W]*?\/\*\s*ExcludeEnd\s*\*\//ig, "")
                .replace(/\/\/\s*BuildExclude\n\r?[\w\W]*?\n\r?/ig, "");

            // Remove empty definitions
            contents = contents
                .replace(/define\(\[[^\]]*\]\)[\W\n]+$/, "")
                .replace(/@VERSION/, pkg.version);
        }
        return contents;
    }
};
