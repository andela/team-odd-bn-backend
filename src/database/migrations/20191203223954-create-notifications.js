'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {  
          model: 'users',
          key: 'id'
        }
      },
      tripRequestId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: true,
        defaultValue: null,
        references: {  
          model: 'tripRequests',
          key: 'id'
        }
      },
      managerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {  
          model: 'users',
          key: 'id'
        }
      },
      message: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      markRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('notifications');
  }
};
