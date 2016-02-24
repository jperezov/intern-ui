var exec = require('child_process').exec,
    queryString = require('querystring'),
    args = queryString.parse(process.argv.splice(2).join('&')),
    testModules = require('./tests/testModules')(args.functionalTest),
    cmd = 'cd node_modules/intern-ui && ',
    tests = {},
    environments;
try {
    // Try to grab the outer-level environments.json
    environments = require('../tests/environments.json');
} catch (e) {
    // Default to local environments.json if not found
    environments = require('./tests/environments.json');
}

if (args.site in testModules && args.browser in environments) {
    cmd += 'grunt test --site=' + args.site
        + ' --browser=' + args.browser
        + ' --functionalTest=' + args.functionalTest;
} else if (args.site in testModules && args.browser === 'all') {
    cmd += 'grunt testAllBrowsers --site=' + args.site + ' --functionalTest=' + args.functionalTest;
} else {
    console.log('Error: No tests selected');
    return;
}
exec(cmd, function(error, stdout) {
    if (stdout) {
        console.log(stdout.replace(/\[\d*m/g, '').replace(new RegExp('^.*' + environments[args.site].browserName + '\n', 'm'), ''));
    } else {
        console.log(JSON.stringify({ error: 'Script did not finish.' }));
    }
});
