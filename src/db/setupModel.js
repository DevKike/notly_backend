const { Company, CompanySchema } = require("../modules/company/model/company.model");
const { Role, RoleSchema } = require("../modules/employee/model/role.model");
const { Employee, EmployeeSchema } = require("../modules/employee/model/employee.model");
const { Project, ProjectSchema } = require("../modules/project/model/project.model");
const { Task, TaskSchema } = require("../modules/project/model/task.model");

const setupModel = (sequelize) => {
  Company.init(CompanySchema, Company.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Project.init(ProjectSchema, Project.config(sequelize));
  Task.init(TaskSchema, Task.config(sequelize));
};

module.exports = setupModel;
