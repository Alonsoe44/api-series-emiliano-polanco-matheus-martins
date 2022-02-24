require("dotenv").config();
const debug = require("debug")("streaming-app:controllerUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../dataBase/models/User");

const secret = process.env.JWT_SECRET;

const loginController = async (req, res, next) => {
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials");
    loginError.status = 401;
    next(loginError);
  };
  const { username, password } = req.body;
  const userFounded = await User.findOne({ username });
  if (userFounded) {
    const passwordMatch = await bcrypt.compare(password, userFounded.password);
    if (passwordMatch) {
      const payloadUser = {
        name: userFounded.name,
        id: userFounded.id,
      };
      const token = jwt.sign(payloadUser, secret);
      res.status(200).json({ token });
    } else {
      loginErrorProtocol();
    }
  } else {
    loginErrorProtocol();
  }
};

const registerController = async (req, res, next) => {
  const { name, username, password } = req.body;
  debug("Iam a debvugge");
  debug(name);
  debug(username);
  const repitedUser = await User.findOne({ username });
  debug(repitedUser);
  if (repitedUser) {
    const error = new Error("The userfdsname isn't avaliable");
    error.status = 400;
    next(error);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      username,
      password: hashedPassword,
    };
    await User.create(newUser);
    res.json({ message: "Creation completed" });
  }
};
module.exports = { loginController, registerController };
