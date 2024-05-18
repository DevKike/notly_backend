"use strict";

const { PROJECT_TABLE, ProjectSchema } = require("../modules/project/model/project.model");
const { TASK_TABLE, TaskSchema } = require("../modules/project/model/task.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable(PROJECT_TABLE, ProjectSchema);
    queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(PROJECT_TABLE);
    queryInterface.dropTable(TASK_TABLE);
  },
};
