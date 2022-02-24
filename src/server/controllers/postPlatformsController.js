const debug = require("debug")("streaming-app:postPlatformController");
const chalk = require("chalk");
const Platform = require("../../dataBase/models/Platform");

const postPlatformsController = async (req, res, next) => {
  try {
    const newPlatform = req.body;
    const createdPlatform = await Platform.create(newPlatform);
    res.status(201).json(createdPlatform);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 400;
    next(error);
  }
};

module.exports = postPlatformsController;
