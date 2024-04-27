const http = require('node:http');

const port = 5000;
const host = 'localhost';

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html');

  const { method } = request;

  if (method === 'GET') {
    response.statusCode = 200;
    response.end('<h1>Hello, NodeJS!</h1>');
  }

  if (method === 'POST') {
    let body = [];

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      response.statusCode = 201;

      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body);
      response.end(`<h1>Hello, ${name}!</h1>`);
    });
  }
});

server.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`);
});
