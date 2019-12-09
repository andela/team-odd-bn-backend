'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('userProfile', 'isVerified');
    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'userProfile',
      'isVerified',
      Sequelize.BOOLEAN
    );
  }
};
