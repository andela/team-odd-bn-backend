'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequestCities = sequelize.define('tripRequestCities', {
    tripRequestId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER
  }, {});
  tripRequestCities.associate = function(models) {
    tripRequestCities.belongsTo(models.tripRequest, {foreignKey: 'tripRequestId'});
    tripRequestCities.belongsTo(models.cities, {foreignKey: 'cityId'});
  };
  return tripRequestCities;
};
