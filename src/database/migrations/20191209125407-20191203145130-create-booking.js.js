'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('bookings', 'userId', {
      type: Sequelize.INTEGER
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('bookings', 'userId')
  }
};
