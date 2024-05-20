const { models } = require("../../../db/sequelize");

const create = async (data) => {
  try {
    return await models.Task.create(data);
  } catch (error) {
    throw error;
  }
};

const findTaskById = async (id) => {
  try {
    return await models.Task.findOne({ where: { id: id } });
  } catch (error) {
    throw error;
  }
};

const findTasks = async () => {
  try {
    return await models.Task.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = { create, findTaskById, findTasks };
