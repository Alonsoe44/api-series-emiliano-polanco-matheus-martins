const debug = require("debug")("streaming-app:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  debug("Error: not found");
  res.status(404).json({ error: true, message: "Resource not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug(chalk.red(`Error: ${err.message}`));
  const errorCode = err.status ?? 500;
  const errorMessage = err.status ? err.message : "General error";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = { notFoundError, generalError };
