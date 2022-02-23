const bcrypt = require("bcrypt");

const password = "iamsecure";

const encryptPassword = async (word) => {
  const encrypted = await bcrypt.hash(word, 10);
  console.log(encrypted);
};

encryptPassword(password);
