const { models } = require("../../../db/sequelize");

const findUserByEmail = async (userData) => {
  try {
    return await models.User.findOne({ where: { email: userData.email } });
  } catch (error) {
    throw error;
  }
};

const findRoleByName = async (userData) => {
  try {
    return await models.Role.findOne({ where: { name: userData.role } });
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    return await models.User.create(userData);
  } catch (error) {
    throw error;
  }
};

module.exports = { findUserByEmail, findRoleByName, register };
