const { models } = require("../../../db/sequelize");

const create = async (data) => {
  try {
    return await models.Task.create(data);
  } catch (error) {
    throw error;
  }
};

module.exports = create;