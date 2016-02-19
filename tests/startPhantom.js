/**
 * The purpose of this file is to get PhantomJS running in the background
 * when using Travis CI (or some other CI solution).
 */
require('child_process').spawn('phantomjs', ['--webdriver=4444'], {
    stdio: 'ignore',
    detached: true
}).unref();
