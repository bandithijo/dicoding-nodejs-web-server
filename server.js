const http = require('node:http');

const port = 5000;
const host = 'localhost';

const server = http.createServer((request, response) => {
  response
    .writeHead(200, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({ data: 'Hello, NodeJS Server!' }));
})

server.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`);
})
