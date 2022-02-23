const debug = require("debug")("streaming-app:errors");
const chalk = require("chalk");
const Serie = require("../../dataBase/models/Serie");

const getSeriesController = async (req, res, next) => {
  try {
    const series = await Serie.find();
    res.status(200).json({ platforms: series });
    debug(`These are all the series: ${series}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getSeriesController;
