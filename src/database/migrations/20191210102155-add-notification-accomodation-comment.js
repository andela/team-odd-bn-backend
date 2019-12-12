module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('notifications', 'commentsId', {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: true,
          defaultValue: null,
          references: {
            model: 'comments',
            key: 'id'
          }
        }, { transaction: t }),
        queryInterface.addColumn('notifications', 'accommodationsId', {
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: true,
          defaultValue: null,
          references: {
            model: 'accommodations',
            key: 'id'
          }
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('notifications', 'commentsId', { transaction: t }),
        queryInterface.removeColumn('notifications', 'accommodationsId', { transaction: t })
      ])
    })
  }
};
