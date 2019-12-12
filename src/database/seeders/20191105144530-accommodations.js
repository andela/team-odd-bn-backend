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
      {
        name: 'Golden keys hotel',
        description: 'Best place to be',
        cityId: 1,
        googleCoordinates: 'yeaaaahaaa',
      
        address: 'qwerty',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'radisson blue hotel',
        description: 'Best place to rest',
        cityId: 3,
        googleCoordinates: 'yeaaaahaaasdddds',
      
        address: 'qwertysssds',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Akagera safe motel',
        cityId: 2,
        address: 'Kigali',
        description: 'Pool',
        googleCoordinates: '111.45, 456.34',
      
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accommodations', null, {});
  }
};
