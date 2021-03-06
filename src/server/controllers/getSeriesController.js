const debug = require("debug")("streaming-app:errors");
const chalk = require("chalk");
const Serie = require("../../dataBase/models/Serie");

const getSeriesController = async (req, res, next) => {
  try {
    const series = await Serie.findOne().populate({
      path: "platform",
      select: "name",
    });
    res.status(200).json({ series });
    debug(`These are all the series: ${series}`);
  } catch (error) {
    debug(chalk.red(`Error: `, error.message));
    error.status = 404;
    next(error);
  }
};

module.exports = getSeriesController;
