'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms',[
      {
        accommodationId: 1,
        name: 'maisai mara',
        roomType: '2 bed 1 living room',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accommodationId: 2,
        name: 'kakum',
        roomType: '4 bed 1 living room',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accommodationId: 3,
        name: 'kilimanjalo',
        roomType: '3 bed 1 living room',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accommodationId: 3,
        name: 'virunga',
        roomType: '5 bed 1 living room',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
