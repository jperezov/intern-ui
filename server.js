var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec,
    port = process.argv[2] || 9090;

function pathAllowed(uri, type) {
    uri = uri.replace(/\/node_modules\/intern-ui/, '');
    if (type !== 'allowedPaths' && type !== 'executables') return false;
    this.allowedPaths = [
        '/node_modules/',
        '/bower/',
        '/tests/',
        '/lib/js/',
        '/index.html',
        '/'
    ];
    this.executables = [
        '^/getTests.js',
        '^/runner.js'
    ];
    for (var path in this[type]) {
        if (uri.match(new RegExp(this[type][path], 'i'))) {
            return true;
        }
    }
    return false;
}

var server = http.createServer(function(request, response) {

    var _url = url.parse(request.url),
        uri = _url.pathname,
        query = (_url.query || '&').replace(/&/g, ' '),
        filename = path.join(process.cwd(), uri),
        command;

    fs.exists(filename, function(exists) {
        if(exists && pathAllowed(uri, 'executables')) {
            command = 'node ' + __dirname + uri.replace(/\/node_modules\/intern-ui/, '') + ' ' + query;
            return exec(command, function(error, stdout, stderr) {
                var err = error || stderr;
                if(err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write((err) + "\n");
                    response.end();
                } else {
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write(stdout);
                    response.end();
                }
            });
        }
        if(!exists || pathAllowed(uri, 'allowedPaths') === false) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
});
// Remove socket timeout. Warning: no scripts will time out with this.
server.timeout = 0;
// Start the server.
server.listen(parseInt(port, 10));
console.log("Server listening on port 9090.\n" +
    "Access at http://localhost:9090/node_modules/intern-ui/\n" +
    "Type CTRL + C at any time to quit.");
