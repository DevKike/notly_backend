const { Company, CompanySchema } = require("../modules/company/model/company.model");
const { Role, RoleSchema } = require("../modules/user/model/role/role.model");
const { User, UserSchema } = require("../modules/user/model/user/user.model");

const setupModel = (sequelize) => {
  Company.init(CompanySchema, Company.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
};

module.exports = setupModel;
