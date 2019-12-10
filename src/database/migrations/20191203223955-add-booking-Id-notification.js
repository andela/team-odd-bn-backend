module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.describeTable('notifications').then(tableDefinition => {
      if (!tableDefinition['bookingId']){
          return queryInterface.addColumn('notifications', 'bookingId',  {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {  
              model: 'bookings',
              key: 'id'
            } } );
      } else {
          return Promise.resolve(true);
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('notifications');
  } 
}


