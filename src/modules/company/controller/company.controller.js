const { findCompanyByNit, findCompanyByCellPhone, registerCompany, findCompanyByEmail } = require("../service/company.service");
const { registerEmployee } = require("../../employee/controller/employee.controller");

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

    const newCompany = await registerCompany(companyData);

    const companyId = newCompany.dataValues.id;

    const newDirectorData = { ...directorData, companyId }

    const newDirector = await registerEmployee(newDirectorData);
    return { company: newCompany, director: newDirector };
  } catch (error) {
    throw error;
  }
};

module.exports = registerCompanyAndDirector;