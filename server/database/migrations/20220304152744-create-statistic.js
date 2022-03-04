'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Statistics', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          workoutID: {
            type: Sequelize.UUID,
            foreignKey: true,
            references: {
              model: "Workouts",
              key: "id"
            }
          },
          user: {
            type: Sequelize.STRING
          },
          exerciseId: {
            type: Sequelize.UUID,
            foreignKey: true,
            references: {
              model: "Exercises",
              key: "id"
            }
          },
          set: {
            type: Sequelize.INTEGER
          },
          weight: {
            type: Sequelize.INTEGER
          },
          completedReps: {
            type: Sequelize.INTEGER
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statistics');
  }
};