'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tripRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      tripTypeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'tripTypes',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      statusId: {
        type: Sequelize.INTEGER,
        references:{
          model:'status',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        defaultValue: 1 , 
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
    return queryInterface.dropTable('tripRequests');
  }
};
