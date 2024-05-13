const register = require("../service/company.service");

const registerCompany = async (companyData) => {
  try {
    const newCompany = await register(companyData);
    return newCompany;
  } catch (error) {
    throw error;
  }
};

module.exports = registerCompany;