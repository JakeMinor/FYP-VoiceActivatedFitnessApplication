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
        Reps: {
         type: Sequelize.INTEGER,
         defaultValue: null
        },
        Sets: {
         type: Sequelize.INTEGER,
         defaultValue: null
        },
        TimeInSeconds: {
         type: Sequelize.INTEGER,
         defaultValue: null
        },
        RestTimeInSeconds: {
         type: Sequelize.INTEGER,
         defaultValue: 120
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
