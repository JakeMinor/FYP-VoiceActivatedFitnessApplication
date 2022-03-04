'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.belongsToMany(models.Equipments, {through: "Exercises_Equipments"})
      Exercise.belongsToMany(models.Workouts, {through: "Workouts_Exercises"})
      Exercise.hasMany(models.Statistics)
    }
  }
  Exercise.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      isUUID: 4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    information: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Exercises',
  });
  return Exercise;
};