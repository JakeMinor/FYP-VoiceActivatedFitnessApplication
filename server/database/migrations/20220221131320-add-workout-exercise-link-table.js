'use strict';

module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
     return queryInterface.createTable(
       'Workouts_Exercises',
       {
        ExerciseId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Exercise",
          key: "id"
         }
        },
        WorkoutId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Workout",
          key: "id"
         }
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
       }
     );
    })
 },

 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Workouts_Exercises');
 }
};
