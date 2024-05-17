const { Sequelize } = require("sequelize");
const { DATABASE } = require("../config/config");
const setupModel = require("./setupModel");

const { USER, PASS, HOST, NAME, PORT } = DATABASE;

const sequelize = new Sequelize(NAME, USER, PASS, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
});

setupModel(sequelize);

module.exports = sequelize;