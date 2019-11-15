'use strict';
module.exports = (sequelize, DataTypes) => {
  const trips = sequelize.define('trips', {
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    reason: DataTypes.STRING,
    tripType: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  trips.associate = function(models) {
    // associations can be defined here
  };
  return trips;
};