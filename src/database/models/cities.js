'use strict';
module.exports = (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    name: DataTypes.STRING
  }, {});
  cities.associate = function(models) {
    cities.hasMany(models.tripRequestCities, {foreignKey: 'id'});
  };
  return cities;
};
