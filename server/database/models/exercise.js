'use strict';
import { Model } from "sequelize"

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.belongsToMany(models.Equipment, {through: 'ExercisesEquipment'})
    }
  }
  Exercise.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    information: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};