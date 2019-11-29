'use strict';
import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'admin@gmail.com',
        password: '$2b$10$/Zh5Kwn95d/LPBwjL2VRc.Hpef/XZ2spe6U0eLksDgcxDuroB4XSq',
        isVerified:true,
        signupType:'Barefoot',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'mailer',
        lastName: 'manager',
        email: 'manager.email@gmail.com',
        password: '$2b$10$/Zh5Kwn95d/LPBwjL2VRc.Hpef/XZ2spe6U0eLksDgcxDuroB4XSq',
        isVerified: true,
        signupType: 'Barefoot',
        roleId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jean',
        lastName: 'Moon',
        email: 'jean@gmail.com',
        password: '$2b$10$EVp9ow6OlwEldRIaXTdOB.sqG3zqyMUnOzNuAvaiVqzk6OvPcmSDC',
        signupType: 'Barefoot',
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
