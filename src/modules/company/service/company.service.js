const sequelize = require("../../../db/sequelize");
const { models } = require("../../../db/sequelize");

const findCompanyByNit = async (nit) => {
  try {
    return await models.Company.findOne({ where: { nit: nit } });
  } catch (error) {
    throw error;
  }
};

const findCompanyByPhoneNumber = async (phoneNumber) => {
  try {
    return await models.Company.findOne({ where: { phoneNumber: phoneNumber } });
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

const register = async (companyData, directorData) => {
  const transaction = await sequelize.transaction();
  try {
    const newCompany = await models.Company.create(companyData, { transaction });

    const companyId = newCompany.dataValues.id;
    const newDirectorData = { ...directorData, companyId };

    const newDirector = await models.Employee.create(newDirectorData, { transaction });
 
    await transaction.commit();
    return { company: newCompany, director: newDirector };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const update = async (data, id) => {
  try {
    return await models.Company.update(data, { where: { id: id } });
  } catch(error) {
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

module.exports = { findCompanyByNit, findCompanyByPhoneNumber, findCompanyByEmail, register, update, findCompanyById };
