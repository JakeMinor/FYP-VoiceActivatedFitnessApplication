'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.Statistic)
    }
  }

  Note.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      isUUID: 4
    },
    statisticId: {
      allowNull: false,
      type: DataTypes.UUID,
      isUUID: 4
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlphanumeric: true
    }
  }, {
    sequelize,
    modelName: 'note',
  });
  return Note;
};