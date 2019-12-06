'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accommodations', [
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
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accommodations', null, {});
  }
};
