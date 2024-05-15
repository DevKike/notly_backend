const { verify, sign } = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (token) => {
  try {
    return verify(token, config.TOKEN.jwtToken);
  } catch (error) {
    throw new Error("Error verifying token");
  }
};

const signToken = (id, role) => {
  try {
    return sign({ id, role }, config.TOKEN.jwtToken, {
      expiresIn: "24h",
    });
  } catch (error) {
    throw new Error("Error signing token");
  }
};

module.exports = { verifyToken, signToken };
