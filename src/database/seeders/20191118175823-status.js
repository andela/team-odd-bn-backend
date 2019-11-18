'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [
      {
        status:'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status:'Approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status:'Rejected',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {});
  }
};

