const { models } = require("../../../db/sequelize");

const register = async (companyData) => {
  try {
    return newCompany = await models.Company.create(companyData);

  } catch (error) {
    throw error;
  }
};

module.exports = register;