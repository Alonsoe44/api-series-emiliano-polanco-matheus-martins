const usersRouter = require("express").Router();
const userController = require("../controllers/userControllers");

usersRouter.post("/login", userController);

module.exports = usersRouter;
