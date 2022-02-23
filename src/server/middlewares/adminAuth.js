const debug = require("debug")("streaming-app:adminAuth");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../dataBase/models/User");

const isAdmin = async (req, res, next) => {
  const headerAuth = req.header("Authorization");
  const { username } = req.body;
  const user = User.findOne({ username });
  debug(`User data: ${user}`);

  if (!headerAuth) {
    const error = new Error("You're not authorized");
    res.status(401);
    next(error);
  } else {
    const userToken = headerAuth.replace("Bearer ", "");
    debug(`headerAuth: ${headerAuth}`);

    if (!jwt.verify(userToken, process.env.JWT_SECRET)) {
      const error = new Error("Unable to verify if admin");
      res.status(401);
      next(error);
    } else {
      if (user.admin === false) {
        const error = new Error("Not an administrator");
        debug(chalk.red(`Error: `, error.message));
        res.status(403);
        next(error);
      }
      next();
    }
  }
};

module.exports = isAdmin;
