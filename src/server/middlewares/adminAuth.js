const debug = require("debug")("streaming-app:adminAuth");
const chalk = require("chalk");

const adminAuth = async (req, res, next) => {
  const { username, admin } = req.body;

  if (admin === false) {
    const error = new Error("Not an administrator");
    debug(chalk.red(`Error: `, error.message));
    res.status(403);
    next(error);
  } else {
    next();
    debug(chalk.green(`Welcome admin: ${username}`));
  }
};

module.exports = adminAuth;
