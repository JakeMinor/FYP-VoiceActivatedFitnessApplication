'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      allowNull: false,
      defaultValue: 0,
      isInt: true
    },
    completedReps: {
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