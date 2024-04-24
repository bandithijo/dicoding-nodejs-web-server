const http = require('node:http');

const port = 5000;
const host = 'localhost';

const output = (status, message) => {
  return JSON.stringify({ status, message });
};

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { method } = request;

  if (method === 'GET') {
    response.statusCode = 200;
    response.end(output(200, 'Berhasil ditampilkan'));
  }

  if (method === 'POST') {
    response.statusCode = 201;
    response.end(output(201, 'Berhasil dibuat'));
  }

  if (method === 'PATCH' || method === 'PUT') {
    response.statusCode = 202;
    response.end(output(202, 'Berhasil diupdate'));
  }

  if (method === 'DELETE') {
    response.statusCode = 204;
    response.end(output(204, 'Berhasil dihapus'));
  }
});

server.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`);
});
