'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Equipment', [
      {
        name: "Treadmill"
      },
      {
        name: "Dumbbells"
      },
      {
        name: "Barbell"
      },
      {
        name: "Bar"
      },
      {
        name: "Resistance bands"
      },
      {
        name: "Resistance cables"
      },
      {
        name: "Battle ropes"
      },
      {
        name: "Static bike"
      },
      {
        name: "Yoga mat"
      },
      {
        name: "Medicine ball"
      },
      {
        name: "Indoor rower"
      },
      {
        name: "Kettle bell"
      },
      {
        name: "Skipping rope"
      },
      {
        name: "Bench"
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Equipment', null, {});
  }
};
