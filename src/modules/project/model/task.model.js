const { DataTypes, Model } = require("sequelize");
const { PROJECT_TABLE } = require("./project.model");
const { EMPLOYEE_TABLE } = require("../../employee/model/employee.model");

const TASK_TABLE = "tasks";

const TaskSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  points: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
  priority: {
    allowNull: false,
    type: DataTypes.SMALLINT,
  },
  startDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  endDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  projectId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PROJECT_TABLE,
      key: "id",
    },
  },
  employeeId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: EMPLOYEE_TABLE,
      key: "id",
    },
  },
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.Project, {
      as: "project",
      foreignKey: "projectId",
    });
    this.belongsTo(models.Employee, {
      as: "employee",
      foreignKey: "employeeId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: "Task",
      timestamps: false,
    };
  }
}

module.exports = { TASK_TABLE, TaskSchema, Task };
