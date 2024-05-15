const { DataTypes, Model } = require("sequelize");
const { ROLE_TABLE } = require("./role.model");

const PERSON_TABLE = "people";

const PersonSchema = {
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

class Person extends Model {
  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERSON_TABLE,
      modelName: "Person",
      timestamps: false,
    };
  }
}

module.exports = { PERSON_TABLE, PersonSchema, Person };
