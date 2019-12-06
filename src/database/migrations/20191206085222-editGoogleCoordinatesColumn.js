'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('accommodations', 'googleCoordinate', 'googleCoordinates', {
      type: Sequelize.STRING,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('accommodations', 'googleCoordinates', 'googleCoordinate', {
      type: Sequelize.STRING,
    })
  }
};
