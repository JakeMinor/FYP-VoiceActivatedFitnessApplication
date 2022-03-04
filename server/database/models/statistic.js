'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    static associate(models) {
      Statistic.belongsTo(models.Workouts, { foreignKey: { name: 'workoutId', allowNull: false }})
      Statistic.belongsTo(models.Exercises, { foreignKey: {name: 'exerciseId', allowNull: false }})
    }
  }
  Statistic.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      isUUID: 4
    },
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      isUUID: 4
    },
    set: {
      type: DataTypes.NUMBER,
      allowNull: false,
      isInt: true
    },
    weight: {
      type: DataTypes.NUMBER,
      defaultValue: null,
      isInt: true
    },
    reps: {
      type: DataTypes.NUMBER,
      allowNull: false,
      isInt: true
    }
  }, {
    sequelize,
    modelName: 'Statistics',
  });
  return Statistic;
};