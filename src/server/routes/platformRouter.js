const express = require("express");
const getPlatformsController = require("../controllers/getPlatformsController");
const postPlatformsController = require("../controllers/postPlatformsController");
const isAdmin = require("../middlewares/adminAuth");

const platformRouter = express.Router();

platformRouter.get("/", getPlatformsController);
platformRouter.post("/", isAdmin, postPlatformsController);

module.exports = platformRouter;
