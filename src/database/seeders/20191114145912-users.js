'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@gmail.com',
        password: '$2b$10$fZ7o3DAOl6nRk/nXJ.Fe1.DHmh9q5rByeodydnM22nmtIKBpw07yW',
        roleId: 3,
        isVerified: true,
        signupType:'default',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'user',
        lastName: 'test',
        email: 'test@email.com',
        password: '$2b$10$EVp9ow6OlwEldRIaXTdOB.sqG3zqyMUnOzNuAvaiVqzk6OvPcmSDC',
        signupType: 'Barefoot',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'myuser',
        lastName: 'mytest',
        email: 'mytest@myemail.com',
        password: '$2b$10$EVp9ow6OlwEldRIaXTdOB.sqG3zqyMUnOzNuAvaiVqzk6OvPcmSDC',
        signupType: 'Barefoot',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
