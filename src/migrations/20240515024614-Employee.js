'use strict';

const { ROLE_TABLE, RoleSchema } = require("../modules/employee/model/role.model");
const { EMPLOYEE_TABLE, EmployeeSchema } = require("../modules/employee/model/employee.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(ROLE_TABLE, RoleSchema);
    queryInterface.createTable(EMPLOYEE_TABLE, EmployeeSchema);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(EMPLOYEE_TABLE);
    queryInterface.dropTable(ROLE_TABLE);
  }
};
