const jwt = require("jsonwebtoken");
const User = require("../../dataBase/models/User");

const isAdmin = async (req, res, next) => {
  const headerAuth = req.header("Authorization");

  if (!headerAuth) {
    const error = new Error("You're not authorized");
    res.status(401);
    next(error);
  } else {
    const userToken = headerAuth.replace("Bearer ", "");
    const { id } = jwt.decode(userToken, { payload: true });
    const { admin } = await User.findById(id);
    if (admin) {
      next();
    } else {
      const error = new Error("You're not admin");
      res.status(401);
      next(error);
    }
  }
};

module.exports = isAdmin;
