'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('accommodations', [{
        name: 'Akagera safe motel',
        cityId: 2,
        address: 'Kigali',
        description: 'Pool',
        googleCoordinates: '111.45, 456.34',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('accommodations', null, {});

  }
};
