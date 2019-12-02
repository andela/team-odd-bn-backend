'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('accommodations', 'googleCordinates', 'googleCoordinates', {
      type: Sequelize.STRING,
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('accommodations', 'googleCoordinates', 'googleCordinates', {
      type: Sequelize.STRING,
    })
  }
};
