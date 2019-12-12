module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.describeTable('accommodations').then(tableDefinition => {
      if (!tableDefinition['userId']){
          return queryInterface.addColumn('accommodations', 'userId',  {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {  
              model: 'users',
              key: 'id'
            } } );
      } else {
          return Promise.resolve(true);
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accommodations');
  } 
}


