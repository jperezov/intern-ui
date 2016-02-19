// Kinda pointless, but if it makes installation easier...
require('child_process').exec("cd node_modules/intern-ui && bower install && grunt", function(error, stdout) {
    error && console.log(error);
    stdout && console.log(stdout);
});