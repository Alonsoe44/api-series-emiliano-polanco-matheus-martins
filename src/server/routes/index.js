const express = require("express");
const getPlatformsController = require("../controllers/getPlatformsController");

const platformRouter = express.Router();
const seriesRouter = express.Router();

platformRouter.get("/", getPlatformsController);
seriesRouter.get("/", getSeriesController);

module.exports = { platformRouter, seriesRouter };
