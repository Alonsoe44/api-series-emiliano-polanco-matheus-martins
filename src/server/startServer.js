const debug = require("debug")("streaming-app:server");

const startServer = async (app, port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`The server it's up and listening in http://localhost:${port}`);
      resolve();
    });

    server.on("error", (error) => {
      debug("We couldn't initialize the server");
      debug(`Error${error.message}`);
      reject();
    });
  });

module.exports = startServer;
