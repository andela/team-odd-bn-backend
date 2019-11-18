'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tripRequestCities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripRequestId: {
        type: Sequelize.INTEGER,
        references:{
          model:'tripRequests',
          key:'id'
        }
      },
      destinationId: {
        type: Sequelize.INTEGER,
        references:{
          model:'cities',
          key:'id'
        }
      }, 
      originId: {
        type: Sequelize.INTEGER,
        references:{
          model:'cities',
          key:'id'
        }
      },
      reason: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      returnDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tripRequestCities');
  }
};
