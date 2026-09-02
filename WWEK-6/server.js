var http = require('http');

var message = ["HELLO", "hello", "+0", "node.js"];
var PORT = 8000;

var server = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.write("<html><head><title>HTTP Demo</title></head>");
  res.write("<body>");

  for (var id = 0; id < message.length; id++) {
    if (id % 2 == 0) {
      res.write("<h1 style='color:blue'>" + message[id] + "</h1>");
    } else {
      res.write("<h6 style='color:red'>" + message[id] + "</h6>");
    }
  }

  res.end("</body></html>");
});

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use. Stop the other process or change the port.');
    process.exit(1);
  }

  throw err;
});

server.listen(PORT, function () {
  console.log('Server running at http://localhost:' + PORT);
});