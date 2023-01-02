const { createServer } = require("node:http");

function createApp() {
  return createServer((request, response) => {
    response.statusCode = 200;

    response.setHeader("Content-Type", "text/html");

    response.end("testo di prova");
  });
}

module.exports = createApp;