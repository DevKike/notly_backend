const { DataTypes, Model } = require("sequelize");
const { ROLE_TABLE } = require("./role.model");

const EMPLOYEE_TABLE = "employees";

const EmployeeSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  roleId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
      key: "id",
    },
  },
};

class Employee extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {
      as: "role",
      foreignKey: "roleId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: "Employee",
      timestamps: false,
    };
  }
}

module.exports = { EMPLOYEE_TABLE, EmployeeSchema, Employee };
