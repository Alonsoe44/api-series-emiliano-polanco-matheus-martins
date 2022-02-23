require("dotenv").config();
const debug = require("debug")("streaming-app:root");
const startServer = require("./server/startServer");

const app = require("./server/index");
const connectDataBase = require("./dataBase");

const port = process.env.PORT;
const connectionString = process.env.MONGO_STRING;

(async () => {
  try {
    await connectDataBase(connectionString);
    await startServer(app, port);
  } catch {
    debug("The server is broken");
  }
})();
