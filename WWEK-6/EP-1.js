const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the Node.js HTTP server!\n');
    return;
  }

  if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is the About page.\n');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 - Page not found\n');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
