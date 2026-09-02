const http = require('http');
const qs = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const queryParams = Object.fromEntries(url.searchParams.entries());

  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          method: req.method,
          pathname: url.pathname,
          queryString: queryParams,
          formData: {}
        },
        null,
        2
      )
    );
    return;
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = qs.parse(body);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify(
          {
            method: req.method,
            pathname: url.pathname,
            queryString: queryParams,
            formData: formData
          },
          null,
          2
        )
      );
    });
    return;
  }

  res.writeHead(405, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Method not allowed' }));
});

server.listen(PORT, () => {
  console.log(`Node.js HTTP server is running on http://localhost:${PORT}`);
});
