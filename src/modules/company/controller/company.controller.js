const { findRoleByName } = require("../../employee/service/employee.service");
const { findCompanyByNit, findCompanyByCellPhone, register, findCompanyByEmail } = require("../service/company.service");
const { hash } = require("../../../util/bcrypt");

const registerCompanyAndDirector = async (companyData, directorData) => {
  try {
    const isNitExists = await findCompanyByNit(companyData.nit);

    if (isNitExists) {
      throw new Error("Nit has already been registered");
    }

    const isCellPhoneExists = await findCompanyByCellPhone(companyData.cellPhone);

    if (isCellPhoneExists) {
      throw new Error("Cellphone has already been registered");
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
    
    const newDirectorData = {...directorData, password, roleId}

    if (newDirectorData.role) {
      delete newDirectorData.role;
    }

    const { newCompany, newDirector } = await register(companyData, newDirectorData);

    return { company: newCompany, director: newDirector };
  } catch (error) {
    throw error;
  }
};

module.exports = registerCompanyAndDirector;