const { findRoleByName, findEmployeeById } = require("../../employee/service/employee.service");
const { findCompanyByNit, findCompanyByPhoneNumber, register, findCompanyByEmail, findAllCompanies, findCompanyById, update } = require("../service/company.service");
const { hash } = require("../../../util/bcrypt");
const { URL } = require("../../../config/config");

const registerCompanyAndDirector = async (companyData, directorData) => {
  try {
    const isNitExists = await findCompanyByNit(companyData.nit);

    if (isNitExists) {
      throw new Error("Nit has already been registered");
    }

    const isPhoneNumberExists = await findCompanyByPhoneNumber(companyData.phoneNumber);

    if (isPhoneNumberExists) {
      throw new Error("Phone number has already been registered");
    }

    const isEmailExists = await findCompanyByEmail(companyData.email);

    if (isEmailExists) {
      throw new Error("Email already in use");
    }

    const role = await findRoleByName(directorData.role);

    if (!role) {
      throw new Error("Role was not found");
    }

    const roleId = role.dataValues.id;  

    const password = hash(directorData.password);

    const newDirectorData = { ...directorData, password, roleId };

    if (newDirectorData.role) {
      delete newDirectorData.role;
    }

    const { newCompany, newDirector } = await register(companyData,  newDirectorData);

    return { company: newCompany, director: newDirector };
  } catch (error) {
    throw error;
  }
};

const getCompanyByDirector = async (directorId) => {
  try {
    const director = await findEmployeeById(directorId);

    const companyDirectorId = director.dataValues.companyId;

    return await findCompanyById(companyDirectorId);
    } catch(error) {
    throw error;
  }
}

const updateCompanyData = async (directorId, companyData) => {
  try {
    const company = await getCompanyByDirector(directorId);
    
    const companyId = company.dataValues.id;

    return await update(companyData, companyId);
  } catch(error) {
    throw error;
  }
}

module.exports = { registerCompanyAndDirector, getCompanyByDirector, updateCompanyData };
