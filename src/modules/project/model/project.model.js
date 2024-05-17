const { DataTypes, Model } = require("sequelize");
const { COMPANY_TABLE } = require("../../company/model/company.model");

const PROJECT_TABLE = "projects";

const ProjectSchema = {
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
  companyId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: COMPANY_TABLE,
      key: "id",
    },
  },
};

class Project extends Model {
  static associate(models) {
    this.belongsTo(models.Company, {
      as: "companies",
      foreignKey: companyId,
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROJECT_TABLE,
      modelName: "Project",
      timestamps: false,
    };
  }
}

module.exports = { PROJECT_TABLE, ProjectSchema, Project };
