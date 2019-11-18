'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tripTypes', [
      {
        tripType:'OneWay',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tripType:'RoundTrip',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tripType:'MultiCity',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tripTypes', null, {});
  }
};


