const { models } = require("../../../db/sequelize");

const findEmployeeByEmail = async (email) => {
  try {
    return await models.Employee.findOne({ where: { email: email } });
  } catch (error) {
    throw error;
  }
};

const findEmployeeById = async (id) => {
  try {
    return await models.Employee.findOne({ where: { id: id } });
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

const findRoleById = async (id) => {
  try {
    return await models.Role.findOne({ where: { id } });
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

const register = async (employeeData) => {
  try {
    return await models.Employee.create(employeeData);
  } catch (error) {
    throw error;
  }
};

const update = async (employeeData) => {
  try {
    return await models.Employee.update(employeeData);
  } catch (error) {
    throw error;
  }
};

module.exports = { findEmployeeByEmail, findEmployeeById, findRoleByName, findRoleById, findRoles, register, update };
