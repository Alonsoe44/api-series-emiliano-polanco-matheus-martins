require("dotenv").config();
const debug = require("debug")("streaming-app:root");
const startServer = require("./server/startServer");

const app = require("./server/index");

debug("hi");

const port = process.env.PORT;

(async () => {
  try {
    await startServer(app, port);
  } catch {
    debug("The server it's broken");
  }
})();
