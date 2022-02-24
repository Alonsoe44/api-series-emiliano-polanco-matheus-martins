const debug = require("debug")("streaming-app:deletePlatformController");
const chalk = require("chalk");
const Platform = require("../../dataBase/models/Platform");

const deletePlatformsController = async (req, res, next) => {
  try {
    const platformToDelete = await Platform.findByIdAndDelete(req.params.id);
    debug(`The ${platformToDelete.name} was deleted`);
    res.status(200).json(platformToDelete);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = deletePlatformsController;
