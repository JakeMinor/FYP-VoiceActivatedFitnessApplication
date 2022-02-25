'use strict';

module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
     return queryInterface.createTable(
       'Exercises_Equipments',
       {
        ExerciseId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Exercises",
          key: "id"
         }
        },
        EquipmentId: {
         type: Sequelize.UUID,
         primaryKey: true,
         references: {
          model: "Equipments",
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
  return queryInterface.dropTable('Exercises_Equipments');
 }
};
