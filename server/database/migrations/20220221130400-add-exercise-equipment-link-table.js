'use strict';

module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
     return queryInterface.createTable(
       'Exercises_Equipment',
       {
        ExerciseId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Exercise",
          key: "id"
         }
        },
        EquipmentId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Equipment",
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
  return queryInterface.dropTable('Exercises_Equipment');
 }
};
