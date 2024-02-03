const envObj = require("dotenv");
envObj.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  saltRounds: process.env.saltRounds,
  JWT_SECRET: process.env.JWT_SECRET,
};
