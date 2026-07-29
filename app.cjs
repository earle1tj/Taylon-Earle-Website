const { createServer } = require("node:http");
const next = require("next");

const hostname = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((request, response) => {
      handle(request, response);
    }).listen(port, hostname);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
