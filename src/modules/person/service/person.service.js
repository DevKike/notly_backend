const { models } = require("../../../db/sequelize");

const findPersonByEmail = async (email) => {
  try {
    return await models.Person.findOne({ where: { email: email } });
  } catch (error) {
    throw error;
  }
};

const findRoleByName = async (name) => {
  try {
    return await models.Role.findOne({ where: { name } });
  } catch (error) {
    throw error;
  }
};

const findRoles = async () => {
  try {
    return await models.Role.findAll();
  } catch (error) {
    throw error;
  }
};

const register = async (userData) => {
  try {
    return await models.Person.create(userData);
  } catch (error) {
    throw error;
  }
};

module.exports = { findPersonByEmail, findRoleByName, findRoles, register };
