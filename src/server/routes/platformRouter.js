const express = require("express");
const getPlatformsController = require("../controllers/getPlatformsController");
const postPlatformsController = require("../controllers/postPlatformsController");
const adminAuth = require("../middlewares/adminAuth");

const platformRouter = express.Router();

platformRouter.get("/", getPlatformsController);
platformRouter.post("/", adminAuth, postPlatformsController);

module.exports = platformRouter;
