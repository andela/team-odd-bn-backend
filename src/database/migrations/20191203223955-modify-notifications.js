'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('notifications', 'managerId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('notifications', 'managerId', Sequelize.INTEGER);
  }
};
