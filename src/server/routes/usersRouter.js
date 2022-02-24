const usersRouter = require("express").Router();
const {
  loginController,
  registerController,
} = require("../controllers/userControllers");

usersRouter.post("/login", loginController);
usersRouter.post("/register", registerController);

module.exports = usersRouter;
