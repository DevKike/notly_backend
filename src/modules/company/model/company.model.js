const { DataTypes, Model } = require("sequelize");

const COMPANY_TABLE = "companies";

const CompanySchema = {
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
  nit: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  cellPhone: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
};

class Company extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: COMPANY_TABLE,
      modelName: "Company",
      timestamps: false,
    };
  }
}

module.exports = { COMPANY_TABLE, CompanySchema, Company };
