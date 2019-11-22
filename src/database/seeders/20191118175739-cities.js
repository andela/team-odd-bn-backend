'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [
      {
        name: 'Nairobi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kigali',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kampala',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  }
};
