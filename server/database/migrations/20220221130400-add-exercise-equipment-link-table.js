'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'ExercisesEquipment',
      {
        ExerciseId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        EquipmentId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ExercisesEquipment');
  }
};
