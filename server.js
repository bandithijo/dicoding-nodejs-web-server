const http = require('node:http');

const port = 5000;
const host = 'localhost';

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { method, url } = request;

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end(JSON.stringify({ code: 200, message: 'Halaman homepage' }));
    } else {
      response.statusCode = 400;
      response.end(JSON.stringify({ status: 400, message: 'Request tidak valid' }));
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = 200;
      response.end(JSON.stringify({ code: 200, message: 'Halaman about' }));
    } else if (method === 'POST') {
      let body = [];
      request.on('data', (chunk) => {
        body.push(chunk);
      });
      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 201;
        response.end(JSON.stringify({ status: 201, message: `Hello, ${name}! dari halamam about` }));
      });
    } else {
      response.statusCode = 400;
      response.end(JSON.stringify({ status: 400, message: 'Request tidak valid' }));
    }
  } else {
    response.statusCode = 404;
    response.end(JSON.stringify({ status: 404, message: 'Halaman tidak ditemukan' }));
  }
});

server.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`);
});
