'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.removeColumn('ratings', 'userId'),
      queryInterface.addColumn(
      'ratings',
      'userId',
      {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
      model: 'users',
      key: 'id',
      as: 'userId',}
    }
    )
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ratings', 'userId'),
      queryInterface.addColumn('ratings', 'userId', Sequelize.INTEGER),
    ]);
    
  }
};
