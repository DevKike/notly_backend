const { models } = require("../../../db/sequelize");

const findRoleByName = async (userData) => {
  try {
    return role = await models.Role.findOne({ where: { name: userData.role } });
    
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    return newUser = await models.User.create(userData);

  } catch (error) {
    throw error;
  }
}

module.exports = { findRoleByName, register };