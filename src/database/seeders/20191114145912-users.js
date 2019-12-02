'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@gmail.com',
        password: '$2b$10$Q9H0gYzslg.oIvqoiWBEfesJoe.HTQT0Ezg5itN/h0a5Mf9gxWWvq',
        roleId: 6,
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
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'myuser',
        lastName: 'mytest',
        email: 'mytest@myemail.com',
        password: '$2b$10$EVp9ow6OlwEldRIaXTdOB.sqG3zqyMUnOzNuAvaiVqzk6OvPcmSDC',
        signupType: 'Barefoot',
        roleId: 3,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Mary',
        lastName: 'Doe',
        email: 'marydoe@gmail.com',
        password: 'Merry@12345',
        signupType: 'Barefoot',
        roleId: 3,
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
