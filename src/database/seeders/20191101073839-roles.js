'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        type: 'super admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'travel administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'travel team member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'requester',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
