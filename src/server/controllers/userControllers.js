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
      res.json({ token }).status(200);
    } else {
      loginErrorProtocol();
    }
  } else {
    loginErrorProtocol();
  }
};

module.exports = loginController;
