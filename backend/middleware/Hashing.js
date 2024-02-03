const bcrypt = require("bcrypt");
// const { saltRounds } = require("../config/serverConfig");

const createHash = async (plainPassword) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  return hashedPassword;
};

const validatePassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

module.exports = {
  createHash,
  validatePassword,
};
