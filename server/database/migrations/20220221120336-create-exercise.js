'use strict';

module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
     return queryInterface.createTable('Exercise', {
      id: {
       allowNull: false,
       primaryKey: true,
       type: Sequelize.UUID,
       defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
       type: Sequelize.STRING,
       allowNull: false
      },
      information: {
       type: Sequelize.TEXT
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
  await queryInterface.dropTable('Exercise');
 }
};