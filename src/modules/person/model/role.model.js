const { DataTypes, Model } = require("sequelize");

const ROLE_TABLE = "roles";

const RoleSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Role extends Model {
  static associate(models) {
    this.hasMany(models.Person, {
      as: "people",
      foreignKey: "roleId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: "Role",
      timestamps: false,
    };
  }
}

module.exports = { ROLE_TABLE, RoleSchema, Role };
