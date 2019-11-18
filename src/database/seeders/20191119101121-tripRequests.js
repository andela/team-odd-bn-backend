'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tripRequests', [
      {
        userId: 1,
        tripTypeId: 2,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tripRequests', null, {});
  }
};
