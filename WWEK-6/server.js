var http = require('http');

var message = ["HELLO", "hello", "+0", "node.js"];

http.createServer(function (req, res) {

    res.setHeader('Content-Type', 'text/html');

    res.writeHead(200);

    res.write("<html><head><title>HTTP Demo</title></head>");
    res.write("<body>");

    for (var id = 0; id < message.length; id++) {

        if (id % 2 == 0) {
            // Even index → h1 → blue
            res.write("<h1 style='color:blue'>" + message[id] + "</h1>");
        } 
        else {
            // Odd index → h6 → red
            res.write("<h6 style='color:red'>" + message[id] + "</h6>");
        }
    }

    res.end("</body></html>");

}).listen(8080);
console.log("Server running at http://localhost:8080");