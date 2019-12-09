'use strict';
module.exports = (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    city: DataTypes.STRING
  }, {});
  cities.associate = function(models) {
    cities.hasMany(models.trips, {foreignKey: 'id'},{ onDelete: 'cascade'},{onUpdate: 'cascade'});
    cities.hasMany(models.accommodations,
      {targetKey: 'cityId',sourceKey: 'id', as:'cityAccommodations'},
      { onDelete: 'cascade'},
      {onUpdate: 'cascade'}
      );
    
  };
  return cities;
};
