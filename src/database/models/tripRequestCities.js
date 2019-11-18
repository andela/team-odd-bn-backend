'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequestCities = sequelize.define('tripRequestCities', {
    tripRequestId: DataTypes.INTEGER,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    startDate: DataTypes.STRING,
    returnDate: DataTypes.STRING
  }, {});
  tripRequestCities.associate = function(models) {
    tripRequestCities.belongsTo(models.tripRequests, {foreignKey: 'tripRequestId'},{ onDelete: 'cascade'});
    tripRequestCities.belongsTo(models.cities, {foreignKey: 'originId'},{ onDelete: 'cascade'});
    tripRequestCities.belongsTo(models.cities, {foreignKey: 'destinationId'},{ onDelete: 'cascade'});
  };
  return tripRequestCities;
};
