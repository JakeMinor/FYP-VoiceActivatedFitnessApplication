'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'WorkoutsExercises',
      {
        ExerciseId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        WorkoutId: {
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
    await queryInterface.dropTable('WorkoutsExercises');
  }
};
