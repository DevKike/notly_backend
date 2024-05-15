const { config } = require("dotenv");
config();

module.exports = {
  SERVER: {
    PORT: process.env.PORT ?? 3001,
  },
  DATABASE: {
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    NAME: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
  },
  TOKEN: {
    jwtToken: process.env.TOKEN,
  }
};