'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [
      {
        city: 'Nairobi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'Kigali',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        city: 'Kampala',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  }
};
