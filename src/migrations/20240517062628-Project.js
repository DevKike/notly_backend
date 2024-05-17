"use strict";

const { PROJECT_TABLE, ProjectSchema } = require("../modules/project/model/project.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(PROJECT_TABLE);
  },
};
