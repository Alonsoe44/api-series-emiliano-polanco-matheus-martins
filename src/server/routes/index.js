const express = require("express");
const getPlatformsController = require("../controllers/getPlatformsController");

const platformRouter = express.Router();

platformRouter.get("/", getPlatformsController);

module.exports = platformRouter;
