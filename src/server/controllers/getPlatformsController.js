const debug = require("debug")("streaming-app:platformsController");
const chalk = require("chalk");
const Platform = require("../../dataBase/models/Platform");

const getPlatformsController = async (req, res, next) => {
  try {
    const platforms = await Platform.find();
    res.status(200).json({ platforms });
    debug(`These are all platforms: ${platforms}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getPlatformsController;
