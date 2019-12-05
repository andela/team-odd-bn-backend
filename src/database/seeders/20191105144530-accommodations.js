'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accommodations', [
      {
        name: 'serena hotel',
        cityId: 3,
        address: 'kigali',
        description: '5 stars hotels...',
        googleCoordinates: '-1.956173, 30.063451',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mariot hotel',
        cityId: 2,
        address: 'kigali',
        description: '6 stars hotels...',
        googleCoordinates: '-1.953656, 30.062354',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'muhabura',
        cityId: 1,
        address: 'kigali',
        description: '7 stars hotels...',
        googleCoordinates: '-1.953656, 30.062354',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accommodations', null, {});
  }
};
