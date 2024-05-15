const { Company, CompanySchema } = require("../modules/company/model/company.model");
const { Role, RoleSchema } = require("../modules/person/model/role.model");
const { Person, PersonSchema } = require("../modules/person/model/person.model");

const setupModel = (sequelize) => {
  Company.init(CompanySchema, Company.config(sequelize));
  Person.init(PersonSchema, Person.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
};

module.exports = setupModel;
