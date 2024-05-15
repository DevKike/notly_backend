'use strict';

const { PERSON_TABLE, PersonSchema } = require("../modules/person/model/person.model");
const { ROLE_TABLE, RoleSchema } = require("../modules/person/model/role.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(ROLE_TABLE, RoleSchema);
    queryInterface.createTable(PERSON_TABLE, PersonSchema);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(ROLE_TABLE);
    queryInterface.dropTable(PERSON_TABLE);
  }
};
