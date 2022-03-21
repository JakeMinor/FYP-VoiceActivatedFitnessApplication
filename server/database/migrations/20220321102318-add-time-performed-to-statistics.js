'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Statistics', 'timePerformed', {
      type: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Statistics', 'timePerformed');
  }
};
