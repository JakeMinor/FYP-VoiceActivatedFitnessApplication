'use strict';
import { Model } from "sequelize"

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {}
  }
  Equipment.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};