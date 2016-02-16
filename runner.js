var exec = require('child_process').exec,
    queryString = require('querystring'),
    args = queryString.parse(process.argv.splice(2).join('&')),
    testModules = require('./tests/testModules')(args.functionalTest),
    cmd,
    tests = {},
    browsers = [
        'chrome',
        'firefox',
        'safari',
        'internet explorer'
    ];

if (args.site in testModules && args.browser in browsers) {
    cmd = 'grunt test --site=' + args.site
        + ' --browser=' + args.browser
        + ' --functionalTest=' + args.functionalTest;
} else if (args.site in testModules && args.browser === 'all') {
    cmd = 'grunt testAllBrowsers --site=' + args.site + ' --functionalTest=' + args.functionalTest;
} else {
    console.log('Error: No tests selected');
    return;
}
exec(cmd, function(error, stdout) {
    if (stdout) {
        console.log(stdout.replace(/\[\d*m/g, '').replace(new RegExp('^.*' + browsers[args.site] + '\n', 'm'), ''));
    } else {
        console.log(JSON.stringify({ error: 'Script did not finish.' }));
    }
});
