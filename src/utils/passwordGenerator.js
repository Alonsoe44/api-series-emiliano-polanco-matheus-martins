const debug = require("debug")("streaming-app:password");
const bcrypt = require("bcrypt");

const password = "iamsecure";

const encryptPassword = async (word) => {
  const encrypted = await bcrypt.hash(word, 10);
  debug(encrypted);
};

encryptPassword(password);
