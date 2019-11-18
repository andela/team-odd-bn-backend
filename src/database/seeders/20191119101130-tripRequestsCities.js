'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tripRequestCities', [
      {
        originId: 1,
        destinationId: 2,
        reason:'bla',
        tripRequestId:1,
        startDate: '2019-12-27',
        returnDate: '2020-01-12',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tripRequestCities', null, {});
  }
};
