'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trips', {
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
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      destinationId: {
        type: Sequelize.INTEGER,
        references:{
          model:'cities',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }, 
      originId: {
        type: Sequelize.INTEGER,
        references:{
          model:'cities',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      reason: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      returnDate: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('trips');
  }
};
