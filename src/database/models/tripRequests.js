'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequests = sequelize.define('tripRequests', {
    userId: DataTypes.INTEGER,
    tripTypeId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
  }, {});
  tripRequests.associate = function(models) {
    // associations can be defined here
    tripRequests.belongsTo(models.users, {foreignKey: 'userId'},{ onDelete: 'cascade'});
    tripRequests.belongsTo(models.tripType, {foreignKey: 'tripTypeId'},{ onDelete: 'cascade'});
    tripRequests.hasMany(models.tripRequestCities, {foreignKey: 'id'},{ onDelete: 'cascade'});
  };
  return tripRequests;
};
