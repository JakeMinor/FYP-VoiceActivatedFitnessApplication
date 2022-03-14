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
          workoutId: {
            type: Sequelize.UUID,
            foreignKey: true,
            references: {
              model: "Workouts",
              key: "id"
            }
          },
          user: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          exerciseId: {
            type: Sequelize.UUID,
            foreignKey: true,
            allowNull: false,
            references: {
              model: "Exercises",
              key: "id"
            }
          },
          set: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          weight: {
            type: Sequelize.INTEGER
          },
          reps: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
          }
        });
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statistics');
  }
};