const express = require("express");
const getSeriesController = require("../controllers/getSeriesController");

const seriesRouter = express.Router();

seriesRouter.get("/", getSeriesController);

module.exports = seriesRouter;
