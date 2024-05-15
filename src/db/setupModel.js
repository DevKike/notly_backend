const { Company, CompanySchema } = require("../modules/company/model/company.model");
const { Role, RoleSchema } = require("../modules/employee/model/role.model");
const { Employee, EmployeeSchema } = require("../modules/employee/model/employee.model");

const setupModel = (sequelize) => {
  Company.init(CompanySchema, Company.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
};

module.exports = setupModel;
