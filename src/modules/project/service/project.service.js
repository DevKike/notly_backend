const { models } = require("../../../db/sequelize");

const create = async (data) => {
  try {
    return await models.Project.create(data);
  } catch (error) {
    throw error;
  }
};

const findProjectById = async (id) => {
  try {
    return await models.Projects.findOne({ where: { id: id } });
  } catch (error) {
    throw error;
  }
};

const findAllProjectsById = async (id) => {
  try {
    return await models.Project.findAll({ where: { id: id } });
  } catch (error) {
    throw error;
  }
};

const update = async (id) => {
  try {
    return await models.Project.update({ where: { id: id } });
  } catch (error) {
    throw error;
  }
};

module.exports = { create, findProjectById, findAllProjectsById, update };
