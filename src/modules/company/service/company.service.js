const sequelize = require("../../../db/sequelize");
const { models } = require("../../../db/sequelize");

const findCompanyByNit = async (nit) => {
  try {
    return await models.Company.findOne({ where: { nit: nit } });
  } catch (error) {
    throw error;
  }
};

const findCompanyByCellPhone = async (cellPhone) => {
  try {
    return await models.Company.findOne({ where: { cellPhone: cellPhone } });
  } catch (error) {
    throw error;
  }
};

const findCompanyByEmail = async (email) => {
  try {
    return await models.Company.findOne({ where: { email: email } });
  } catch (error) {
    throw error;
  }
};

const registerCompany = async (companyData) => {
  const transaction = await sequelize.transaction();
  try {
    const res = await models.Company.create(companyData, { transaction });
    await transaction.commit();
    return res;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findCompanyById = async (id) => {
  try {
    return await models.Company.findOne({ where: { id: id } });
  } catch (error) {
    throw error;
  }
};

module.exports = { findCompanyByNit, findCompanyByCellPhone, findCompanyByEmail, registerCompany, findCompanyById };
