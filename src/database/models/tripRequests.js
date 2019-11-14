'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequest = sequelize.define('tripRequest', {
    userId: DataTypes.INTEGER,
    reason: DataTypes.INTEGER,
    tripTypeId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    startDate: DataTypes.DATE,
    returnDate: DataTypes.STRING
  }, {});
  tripRequest.associate = function(models) {
    tripRequest.belongsTo(models.users, {foreignKey: 'userId'});
    tripRequest.belongsTo(models.tripType, {foreignKey: 'tripTypeId'});
    tripRequest.hasMany(models.tripRequestCities, {foreignKey: 'id'});
  };
  return tripRequest;
};
