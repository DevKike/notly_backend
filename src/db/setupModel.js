const { Company, CompanySchema } = require("../modules/company/model/company.model")

const setupModel = (sequelize) => {
    Company.init(CompanySchema, Company.config(sequelize));
}

module.exports = setupModel;