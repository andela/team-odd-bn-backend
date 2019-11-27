'use strict';
module.exports = (sequelize, DataTypes) => {
  const tripRequests = sequelize.define('tripRequests', {
    userId: DataTypes.INTEGER,
    tripTypeId: DataTypes.INTEGER,
    statusId: DataTypes.STRING,
  }, {});
  tripRequests.associate = function(models) {
    tripRequests.belongsTo(
      models.users,
       {foreignKey: 'userId'},
       { onDelete: 'cascade'},
       {onUpdate: 'cascade'});
    tripRequests.belongsTo(
      models.tripTypes, 
      {foreignKey: 'tripTypeId'},
      { onDelete: 'cascade'},
      {onUpdate: 'cascade'});
    tripRequests.belongsTo(
      models.status,
       {foreignKey: 'statusId'},
       { onDelete: 'cascade'},
       {onUpdate: 'cascade'});
    tripRequests.hasMany(
      models.trips,
       {targetKey: 'tripRequestId'},
       { onDelete: 'cascade'},
       {onUpdate: 'cascade'});
  };
  return tripRequests;
};
