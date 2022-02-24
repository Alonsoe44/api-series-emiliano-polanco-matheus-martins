const express = require("express");
const deletePlatformsController = require("../controllers/deletePlatformsController");
const getPlatformsController = require("../controllers/getPlatformsController");
const postPlatformsController = require("../controllers/postPlatformsController");
const isAdmin = require("../middlewares/adminAuth");

const platformRouter = express.Router();

platformRouter.get("/", getPlatformsController);
platformRouter.post("/", isAdmin, postPlatformsController);
platformRouter.delete("/:idPlatform", isAdmin, deletePlatformsController);

module.exports = platformRouter;
