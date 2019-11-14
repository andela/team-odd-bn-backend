'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('tripTypes', [{
        tripType: 'one-way',
        createdAt: new Date(),
        updatedAt: new Date()
        },{
          tripType: 'return',
          createdAt: new Date(),
        updatedAt: new Date()
        },{
          tripType: 'multi-city',
          createdAt: new Date(),
        updatedAt: new Date()
        }], {});
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('tripTypes', null, {});
    }
};
