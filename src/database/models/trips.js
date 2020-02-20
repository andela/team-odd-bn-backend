'use strict';
module.exports = (sequelize, DataTypes) => {
  const trips = sequelize.define('trips', {
    tripRequestId: DataTypes.INTEGER,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    startDate: DataTypes.STRING,
    returnDate: DataTypes.STRING
  }, {});
  trips.associate = function(models) {
    trips.belongsTo(models.tripRequests, {foreignKey: 'tripRequestId'},{ onDelete: 'cascade'},{onUpdate: 'CASCADE'});
    trips.belongsTo(models.cities, {foreignKey: 'originId'},{ onDelete: 'cascade'},{onUpdate: 'CASCADE'});
    trips.belongsTo(models.cities, {foreignKey: 'destinationId'},{ onDelete: 'cascade'},{onUpdate: 'CASCADE'});
  };
  return trips;
};
