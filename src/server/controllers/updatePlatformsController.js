const debug = require("debug")("streaming-app:deletePlatformController");
const chalk = require("chalk");
const Platform = require("../../dataBase/models/Platform");

const updatePlatformsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = req.body;
    const updatedPlatform = await Platform.findByIdAndUpdate(id, platform);
    debug(`The ${updatedPlatform.name} was updated`);
    res.status(200).json(updatedPlatform);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = updatePlatformsController;
