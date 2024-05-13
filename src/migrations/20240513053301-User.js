"use strict";

const { ROLE_TABLE, RoleSchema } = require("../modules/user/model/role/role.model");
const { USER_TABLE, UserSchema } = require("../modules/user/model/user/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(ROLE_TABLE, RoleSchema);
    queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(ROLE_TABLE, RoleSchema);
    queryInterface.dropTable(USER_TABLE, UserSchema);
  },
};
